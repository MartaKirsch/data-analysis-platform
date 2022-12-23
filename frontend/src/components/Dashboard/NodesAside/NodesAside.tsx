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
    dragNaiveBayes,
    dragFileResult,
    dragPredictionResult,
    dragDecisionTree,
    dragRandomForest,
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
            dataId="add-file-data-node"
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
            dataId="add-linear-regression-calculation-node"
          />
        </NodeTippy>
        <NodeTippy content="PCA">
          <NodeButton
            calculationType={CalculationType.PCA}
            nodeType={NodeType.Calculation}
            ref={mergeRefs([buttonRefs.addPCAcalculation, dragPCA])}
            dataId="add-pca-calculation-node"
          />
        </NodeTippy>
        <NodeTippy content="Naive Bayes">
          <NodeButton
            calculationType={CalculationType.NaiveBayes}
            nodeType={NodeType.Calculation}
            ref={mergeRefs([
              buttonRefs.addNaiveBayesCalculation,
              dragNaiveBayes,
            ])}
            dataId="add-naive-bayes-calculation-node"
          />
        </NodeTippy>
        <NodeTippy content="Decision Tree">
          <NodeButton
            calculationType={CalculationType.DecisionTree}
            nodeType={NodeType.Calculation}
            ref={mergeRefs([buttonRefs.addDecisionTree, dragDecisionTree])}
            dataId="add-decision-tree-calculation-node"
          />
        </NodeTippy>
        <NodeTippy content="Random Forest">
          <NodeButton
            calculationType={CalculationType.RandomForest}
            nodeType={NodeType.Calculation}
            ref={mergeRefs([buttonRefs.addRandomForest, dragRandomForest])}
            dataId="add-random-forest-calculation-node"
          />
        </NodeTippy>
      </NodesAsideRow>
      <NodesAsideRow>
        <NodeTippy content="Plot Result">
          <NodeButton
            resultType={ResultType.Plot}
            nodeType={NodeType.Result}
            ref={mergeRefs([buttonRefs.addPlotResult, dragPlotResult])}
            dataId="add-plot-result-node"
          />
        </NodeTippy>
        <NodeTippy content="File Result">
          <NodeButton
            resultType={ResultType.File}
            nodeType={NodeType.Result}
            ref={mergeRefs([buttonRefs.addFileResult, dragFileResult])}
            dataId="add-file-result-node"
          />
        </NodeTippy>
        <NodeTippy content="Prediction">
          <NodeButton
            resultType={ResultType.Prediction}
            nodeType={NodeType.Result}
            ref={mergeRefs([
              buttonRefs.addPredictionResult,
              dragPredictionResult,
            ])}
            dataId="add-prediction-result-node"
          />
        </NodeTippy>
      </NodesAsideRow>
    </NodesAsideWrapper>
  );
};
export default NodesAside;
