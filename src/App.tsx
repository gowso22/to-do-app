import {DragDropContext, DropResult, } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { todoState } from "./atoms";
import Board from "./components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap:10px;
  grid-template-columns: repeat(3, 1fr);
`;





function App() {
  const [toDos, setToDos] = useRecoilState(todoState);

  // onDragEnd : DragDropContext 필수 prop,
  //             유저가 드래그를 끝내 시점에 불려지는 함수
  const onDragEnd = (info:DropResult) => { // args, info : 드래그앤드롭으로 인한 정보를 알려줌 

    // 카드 목록 중 하나를 드래그앤드롭하면 해당 콘솔이 나타남
    // console.log("dnd 완료")  

    /* 
      setToDos(oldToDos => {
      const toDosCopy = [...oldToDos];
      // 1. source.index(드래그 하려고 클릭한 아이템.인덱스)에서 아이템 삭제
      toDosCopy.splice(source.index, 1)
      // 2. 삭제한 아이템을 다시 destination.index(드롭한 아이템.인덱스)에 추가

      //splice >> 1번째 인자값 : 배열에 추가할 특정 배열의 위치를 가르키는 index
      //          2번째 인자값(howmany) : index부터 index+howmany에 해당하는 원소들은 삭제된다. 이 값이 0이면 어떠한 원소도 삭제되지 않는다.
      //          나머지 인자값 : index부터 index+howmany사이에 추가될 값.
      toDosCopy.splice(destination?.index, 0, draggableId);
      return toDosCopy; 
    }); 
    */
    console.log(info);
    const {destination, draggableId, source} = info;

    if(!destination) return;

    // 같은 Board 내에서 item을 드래그앤드롭하였음.
    if(destination?.droppableId === source.droppableId){
      setToDos((allBoards) => {
        // source의 droppableId로부터 배열을 복사함.
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index]
        boardCopy.splice(source.index, 1)
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId] : boardCopy
        }; 
    });
  };
  // 다른 Board로 item을 드래그앤드롭하였음.
  if(destination.droppableId !== source.droppableId){
    setToDos((allBoards) =>{
       const sourceBoard = [...allBoards[source.droppableId]];
       const taskObj = sourceBoard[source.index];
       const destinationBoard = [...allBoards[destination.droppableId]];

       sourceBoard.splice(source.index, 1);
       destinationBoard.splice(destination?.index, 0, taskObj);

       return {
        ...allBoards,
        [source.droppableId] : sourceBoard,
        [destination.droppableId] : destinationBoard,
       }
    })
  }
};

  return (
    // Droppable : 어떤 것을 드롭할 수 있는 영역
    // {()=> <ul></ul>} >> Droppable의 children은 익명함수로 넣어줘야함.

    // Draggable : 드래그할 수 있는 영역
    //             Draggable의 children은 익명함수로 넣어줘야함.  
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map(boardId => (
            <Board 
            toDos={toDos[boardId]} 
            boardId={boardId} 
            key={boardId}/>
            ))}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
