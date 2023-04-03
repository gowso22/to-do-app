import { Droppable } from "react-beautiful-dnd";
import DragabbleCard from "./DragabbleCard";
import styled from "styled-components";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { ITodo, todoState } from "../atoms";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div`
  width:300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;

  display : flex;
  flex-direction : column;
`;

const Title = styled.h2`
    text-align : center;
    font-weight : 600;
    margin-bottom : 10px;
    font-size : 18px;
`
const Area = styled.div<IAreaProps>`
    padding : 20px;
    background-color : ${props => props.isDraggingOver ? "#dfe6e9" : props.isDraggingFromThis ? "#b2bec3" :"transparent"};
    flex-grow : 1;
    transition : background-color 0.2s ease-in-out;
`;
const Form = styled.form`
    width : 100%;
    input { 
        width : 100%;
    }
`;

interface IAreaProps {
    isDraggingOver: boolean;
    isDraggingFromThis: boolean;
}
interface IBoardProps{
    toDos: ITodo[];
    boardId: string;
}
interface IForm {
    toDo : string;
}

function Board({toDos, boardId}: IBoardProps){
    const setToDos =useSetRecoilState(todoState);
    const{register, setValue, handleSubmit} = useForm<IForm>();
    const onVaild = ({toDo}:IForm) => {
        const newToDo = 
        {
            id:Date.now(),
            text : toDo,
        }
        setToDos((allBoards)=>{
            return {
                ...allBoards,
                [boardId]: [...allBoards[boardId], newToDo],
            }
        });
        setValue("toDo", "");
    }
    /* 
        const onClick =() =>{ 
            // button 태그 클릭시 input 태그에 focus가 가도록 설정
            inputRef.current?.focus();
        }
        //useRef : .current 속성으로 전달된 인자로 초기화된 변경 가능한 ref 객체를 반환함.
        //          반환된 객체는 컴포넌트의 전 생명주기를 통해 유지
        //          useRef는 .current 속성에 변경 가능한 값을 담고 있는 '상자'와 같음.
        const inputRef = useRef<HTMLInputElement>(null);
    */

    return(
        <Wrapper>
            <Title>{boardId}</Title>
            {/* 
                <input ref={inputRef} placeholder="grab me"/>
                <button onClick={onClick}>click me</button>
            */}
            <Form onSubmit={handleSubmit(onVaild)}>
                <input 
                    {...register("toDo", {required : true})}
                    type = "text" 
                    placeholder = {`${boardId} 추가`}/>
            </Form>
            <Droppable droppableId={boardId} >
            {(provider, snapshot)=> 
            /* 
                snapshot.isDraggingOver : 현재 선택한 DragabbleCard가 특정 Droppable 위에 드래깅되고 있는지 여부 확인
                snapshot.draggingFromThisWith : 현재 선택한 item이 벗어난 Board
            */
            <Area 
            isDraggingOver = {snapshot.isDraggingOver}
            isDraggingFromThis = {Boolean(snapshot.draggingFromThisWith)}
            ref={provider.innerRef} 
            {...provider.droppableProps}>

                {toDos
                .map((toDo, index) => 
                <DragabbleCard key={toDo.id} toDoId={toDo.id} toDoText={toDo.text} index={index}/>
                )}
                {/*
                placeholder (?ReactElement) 
                Draggable 엘리먼트를 드래그하는 동안 position: fixed(영역을 고정시킴)를 적용합니다. 
                Draggable을 드래그할 때 Droppable 리스트가 작아지는 것을 방지하기 위해 필요합니다. 
                */}
                {provider.placeholder}
            </Area>}

        </Droppable>
      </Wrapper>
    )
}

export default Board;