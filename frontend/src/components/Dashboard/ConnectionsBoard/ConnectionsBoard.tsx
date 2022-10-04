import React, { FC } from "react";
import { useBoardContext } from "../../../context/useBoardContext";
import { calculateLength } from "../../../utils/calculateLength";
import {
  ConnectionsBoardWrapper,
  ConnectionBar,
} from "./ConnectionsBoard.components";

const ConnectionsBoard: FC = () => {
  const { connections, coordinates, disconnect } = useBoardContext();

  return (
    <ConnectionsBoardWrapper>
      {connections
        .filter((c) => c.prevId)
        .map((c, i) => {
          const coordinates1 = coordinates.find(
            (coords) => coords.nodeId === c.nodeId
          )!;
          const coordinates2 = coordinates.find(
            (coords) => coords.nodeId === c.prevId
          )!;

          const width = 50;
          const height = 50;

          const left = coordinates1.x;
          const top = coordinates1.y;

          const left2 = coordinates2.x;
          const top2 = coordinates2.y;

          const centerX = left + width / 2;
          const centerY = top + height / 2;

          const centerX2 = left2 + width / 2;
          const centerY2 = top2 + height / 2;

          const first = Math.asin(
            Math.abs(centerX2 - centerX) /
              calculateLength(centerX, centerY, centerX2, centerY2)
          );
          const second = Math.acos(
            Math.abs(centerX2 - centerX) /
              calculateLength(centerX, centerY, centerX2, centerY2)
          );
          const third =
            -1 *
            Math.acos(
              Math.abs(centerX2 - centerX) /
                calculateLength(centerX, centerY, centerX2, centerY2)
            );
          const fourth =
            -1 *
            Math.asin(
              Math.abs(centerX2 - centerX) /
                calculateLength(centerX, centerY, centerX2, centerY2)
            );

          let radians = 0;
          if (centerX2 > centerX && centerY2 < centerY) radians = first;
          if (centerX2 < centerX && centerY2 < centerY) radians = fourth;
          if (centerX2 > centerX && centerY2 > centerY)
            radians = second + 0.5 * Math.PI;
          if (centerX2 < centerX && centerY2 > centerY)
            radians = third + 1.5 * Math.PI;

          return (
            <ConnectionBar
              top={centerY2}
              left={centerX2}
              bottom={centerY}
              right={centerX}
              rotate={radians}
              key={i}
              onClick={() => disconnect(c.nodeId)}
            />
          );
        })}
    </ConnectionsBoardWrapper>
  );
};

export default ConnectionsBoard;
