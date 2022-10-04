import React, { FC } from "react";
import { ComponentWithChildren } from "../../../types/ComponentWithChildren";
import { NodesAsideRow, NodesAsideWrapper } from "./NodesAside.components";
import NodeButton from "../../Nodes/NodeButton";
import {
  CalculationType,
  NodeDataType,
  NodeType,
  ResultType,
} from "../../../types/Node";
import { mergeRefs } from "react-merge-refs";
import { useNodesAside } from "../../../hooks/useNodesAside";

interface NodesAsideProps extends ComponentWithChildren {}

const NodesAside: FC<NodesAsideProps> = () => {
  const {
    dragCalculationSum,
    dragFileData,
    dragScatterPlotResult,
    buttonRefs,
  } = useNodesAside();

  return (
    <NodesAsideWrapper>
      <NodesAsideRow>
        <NodeButton
          dataType={NodeDataType.File}
          nodeType={NodeType.Data}
          ref={mergeRefs([buttonRefs.addFileData, dragFileData])}
        />
      </NodesAsideRow>
      <NodesAsideRow>
        <NodeButton
          calculationType={CalculationType.Sum}
          nodeType={NodeType.Calculation}
          ref={mergeRefs([buttonRefs.addSumCalculation, dragCalculationSum])}
        />
      </NodesAsideRow>
      <NodesAsideRow>
        <NodeButton
          resultType={ResultType.ScatterPlot}
          nodeType={NodeType.Result}
          ref={mergeRefs([
            buttonRefs.addScatterPlotResult,
            dragScatterPlotResult,
          ])}
        />
      </NodesAsideRow>
    </NodesAsideWrapper>
  );
};
export default NodesAside;
