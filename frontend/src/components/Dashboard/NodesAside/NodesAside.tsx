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
    dragPlotResult,
    dragFileData,
    dragLinearRegression,
    dragFileResult,
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
          calculationType={CalculationType.LinearRegression}
          nodeType={NodeType.Calculation}
          ref={mergeRefs([
            buttonRefs.addLinearRegressionCalculation,
            dragLinearRegression,
          ])}
        />
      </NodesAsideRow>
      <NodesAsideRow>
        <NodeButton
          resultType={ResultType.Plot}
          nodeType={NodeType.Result}
          ref={mergeRefs([buttonRefs.addPlotResult, dragPlotResult])}
        />
        <NodeButton
          resultType={ResultType.File}
          nodeType={NodeType.Result}
          ref={mergeRefs([buttonRefs.addFileResult, dragFileResult])}
        />
      </NodesAsideRow>
    </NodesAsideWrapper>
  );
};
export default NodesAside;
