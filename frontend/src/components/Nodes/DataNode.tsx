import React, { FC, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { mergeRefs } from "react-merge-refs";
import styled from "styled-components";
import { useBoardContext } from "../../context/useBoardContext";
import { ComponentWithChildren } from "../../types/ComponentWithChildren";
import { DraggableType } from "../../types/DraggableType";
import { CalculationNode } from "../../types/Node";
import { Node } from "./Node";

interface Props extends ComponentWithChildren {
  top: number;
  left: number;
  id: string;
}

const Modal = styled.div`
  position: relative;
  top: -100%;
  left: 120%;

  height: 200px;
  width: 300px;

  background-color: skyblue;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  input {
    width: 40%;
  }

  div {
    display: flex;
    justify-content: space-around;
  }
`;

const DataNode: FC<Props> = ({ top, left, id }) => {
  const { dataNodes, connections, connect, setNodeData } = useBoardContext();

  const [data, setData] = useState<number[][]>([
    [0, 0],
    [0, 0],
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [, drag] = useDrag(() => ({
    type: DraggableType.DataNode,
    item: dataNodes.find((dataNode) => dataNode.id === id),
  }));

  const [, drop] = useDrop<CalculationNode>(
    () => ({
      accept: DraggableType.CalculationNode,
      drop: (item) => {
        connect({ nodeId: item.id, prevId: id });
      },
      canDrop: (item) => !connections.find((c) => c.nodeId === item.id)?.prevId,
    }),
    [connect, connections]
  );

  const updateData = (i: number, j: number, val: number) => {
    const newData = [...data];
    newData[i][j] = val;
    setData(newData);
  };

  const handleSave = () => {
    setNodeData(id, data);
    setIsModalVisible(false);
  };

  return (
    <>
      {isModalVisible && (
        <Modal>
          <div>
            <input
              value={data[0][0]}
              onChange={(e) => updateData(0, 0, parseInt(e.target.value))}
            />
            <input
              value={data[0][1]}
              onChange={(e) => updateData(0, 1, parseInt(e.target.value))}
            />
          </div>
          <div>
            <input
              value={data[1][0]}
              onChange={(e) => updateData(1, 0, parseInt(e.target.value))}
            />
            <input
              value={data[1][1]}
              onChange={(e) => updateData(1, 1, parseInt(e.target.value))}
            />
          </div>
          <button onClick={handleSave}>Save</button>
        </Modal>
      )}
      <Node
        left={left}
        top={top}
        bgColor="papayawhip"
        ref={mergeRefs([drag, drop])}
        title={`Data node with id ${id}`}
        onClick={() => setIsModalVisible(true)}
      >
        D
      </Node>
    </>
  );
};

export default DataNode;
