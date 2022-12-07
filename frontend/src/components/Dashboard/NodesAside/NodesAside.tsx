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
import NodeTippy from "../../common/NodeTippy";

interface NodesAsideProps extends ComponentWithChildren {}

const NodesAside: FC<NodesAsideProps> = () => {
  const {
    dragPlotResult,
    dragFileData,
    dragLinearRegression,
    dragPCA,
    dragFileResult,
    buttonRefs,
  } = useNodesAside();

  return (
    <NodesAsideWrapper>
      <NodesAsideRow>
        <NodeTippy content="File Data Source">
          <NodeButton
            dataType={NodeDataType.File}
            nodeType={NodeType.Data}
            ref={mergeRefs([buttonRefs.addFileData, dragFileData])}
          />
        </NodeTippy>
      </NodesAsideRow>
      <NodesAsideRow>
        <NodeTippy content="Linear Regression">
          <NodeButton
            calculationType={CalculationType.LinearRegression}
            nodeType={NodeType.Calculation}
            ref={mergeRefs([
              buttonRefs.addLinearRegressionCalculation,
              dragLinearRegression,
            ])}
          />
        </NodeTippy>
        <NodeTippy content="PCA">
          <NodeButton
            calculationType={CalculationType.PCA}
            nodeType={NodeType.Calculation}
            ref={mergeRefs([buttonRefs.addPCAcalculation, dragPCA])}
          />
        </NodeTippy>
      </NodesAsideRow>
      <NodesAsideRow>
        <NodeTippy content="Plot Result">
          <NodeButton
            resultType={ResultType.Plot}
            nodeType={NodeType.Result}
            ref={mergeRefs([buttonRefs.addPlotResult, dragPlotResult])}
          />
        </NodeTippy>
        <NodeTippy content="File Result">
          <NodeButton
            resultType={ResultType.File}
            nodeType={NodeType.Result}
            ref={mergeRefs([buttonRefs.addFileResult, dragFileResult])}
          />
        </NodeTippy>
      </NodesAsideRow>
    </NodesAsideWrapper>
  );
};
export default NodesAside;
