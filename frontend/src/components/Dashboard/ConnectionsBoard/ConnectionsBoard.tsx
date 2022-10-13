import React, { FC } from "react";
import { useTheme } from "styled-components";
import { useBoardContext } from "../../../context/useBoardContext";
import { Connection } from "../../../types/Connection";
import { calculateLength } from "../../../utils/calculateLength";
import {
  ConnectionsBoardWrapper,
  ConnectionBar,
} from "./ConnectionsBoard.components";

const ConnectionsBoard: FC = () => {
  const { connections, coordinates, disconnect } = useBoardContext();
  const theme = useTheme();

  const findCoordinatesByNodeId = (nodeId: string) =>
    coordinates.find((coords) => coords.nodeId === nodeId);

  const getNumberPartsOfString = (str: string): string[] => {
    const numRegExp = /^[0-9]+$/;
    return str.match(numRegExp) || [];
  };

  const parseThemeDimensionToInt = (
    dim: string,
    defaultDimension = 50
  ): number => {
    const numPartsOfDimension = getNumberPartsOfString(dim);
    return parseInt(numPartsOfDimension.pop() || `${defaultDimension}`);
  };

  const mapConnectionToConnectionBar = (
    connection: Connection,
    index: number
  ) => {
    const nodeId1 = connection[0].id;
    const nodeId2 = connection[1].id;

    const coordinates1 = findCoordinatesByNodeId(nodeId1)!;
    const coordinates2 = findCoordinatesByNodeId(nodeId2)!;

    const width = parseThemeDimensionToInt(theme.dimensions.node.width);
    const height = parseThemeDimensionToInt(theme.dimensions.node.height);

    const left = coordinates1.x;
    const top = coordinates1.y;

    const left2 = coordinates2.x;
    const top2 = coordinates2.y;

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const centerX2 = left2 + width / 2;
    const centerY2 = top2 + height / 2;

    const firstQuarter = Math.asin(
      Math.abs(centerX2 - centerX) /
        calculateLength(centerX, centerY, centerX2, centerY2)
    );
    const secondQuarter = Math.acos(
      Math.abs(centerX2 - centerX) /
        calculateLength(centerX, centerY, centerX2, centerY2)
    );
    const thirdQuarter =
      -1 *
      Math.acos(
        Math.abs(centerX2 - centerX) /
          calculateLength(centerX, centerY, centerX2, centerY2)
      );
    const fourthQuarter =
      -1 *
      Math.asin(
        Math.abs(centerX2 - centerX) /
          calculateLength(centerX, centerY, centerX2, centerY2)
      );

    let radians = 0;
    if (centerX2 > centerX && centerY2 < centerY) radians = firstQuarter;
    if (centerX2 < centerX && centerY2 < centerY) radians = fourthQuarter;
    if (centerX2 > centerX && centerY2 > centerY)
      radians = secondQuarter + 0.5 * Math.PI;
    if (centerX2 < centerX && centerY2 > centerY)
      radians = thirdQuarter + 1.5 * Math.PI;

    return (
      <ConnectionBar
        top={centerY2}
        left={centerX2}
        bottom={centerY}
        right={centerX}
        rotate={radians}
        key={index}
        onClick={() => disconnect(nodeId1, nodeId2)}
      />
    );
  };

  return (
    <ConnectionsBoardWrapper>
      {connections.map(mapConnectionToConnectionBar)}
    </ConnectionsBoardWrapper>
  );
};

export default ConnectionsBoard;
