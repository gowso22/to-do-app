import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";



const Card = styled.div<{isDragging: boolean}>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.isDragging ? "#74b9ff" : props.theme.cardColor};
  box-shadow : ${(props) =>  props.isDragging ? "1px 1px 5px rgba(0,0,0,0.5)" : "none"}
`;

interface IDraggableCardProps{
    toDoId: number;
    toDoText: string;
    index: number;
}

function DragabbleCard ({toDoId, toDoText,index}: IDraggableCardProps){
    return(
        // ※ key과 draggableId 값이 같아야 한다!
        // toDoId+"" >> 텍스트로 변환
        <Draggable draggableId={toDoId+""} index={index}>
                    {(provided, snapshot)=>
                     /* 
                        snapshot.isDragging : 현재 드래그 중이거나 드롭 애니매이션인 item이 있을 경우 true로 설정 
                    */
                    <Card 
                    isDragging={snapshot.isDragging}
                    ref={provided.innerRef}
                    {...provided.draggableProps} 
                    {...provided.dragHandleProps}
                    >
                       {toDoText}
                    </Card>}
                  </Draggable>
    )
}

// React.memo(component) >> reactJS에게 prop이 바뀌지 않는다면 해당하는 component는 렌더링하지 말라고 말하는 역할(불필요한 re-render를 방지)
//                       >> props를 변경하였다면 그 item들만 다시 렌더링됨.
export default React.memo(DragabbleCard);