import {
  CalculationType,
  NodeDataType,
  NodeType,
  ResultType,
} from "../../../types/Node";
import { createCalculationNode } from "../createCalculationNode";
import { createDataNode } from "../createDataNode";
import { createResultNode } from "../createResultNode";

describe("create node functions", () => {
  it("createCalculationNode should create a calculation node based on passed calculation type", () => {
    // arrange
    const calculationType = CalculationType.NaiveBayes;
    const expectedNodeType = NodeType.Calculation;
    const expectedCalculationType = CalculationType.NaiveBayes;

    // act
    const result = createCalculationNode(calculationType);

    // assert
    expect(result.id).toBeDefined();
    expect(result.calculationType).toEqual(expectedCalculationType);
    expect(result.type).toEqual(expectedNodeType);
    expect(result.error).not.toBeDefined();
    expect(result.ref).not.toBeDefined();
    expect(result.parameters).not.toBeDefined();
  });

  it("createDataNode should create a calculation node based on passed data type", () => {
    // arrange
    const dataType = NodeDataType.File;
    const expectedNodeType = NodeType.Data;
    const expectedDataType = NodeDataType.File;

    // act
    const result = createDataNode(dataType);

    // assert
    expect(result.id).toBeDefined();
    expect(result.dataType).toEqual(expectedDataType);
    expect(result.type).toEqual(expectedNodeType);
    expect(result.errors).toEqual([]);
    expect(result.ref).not.toBeDefined();
    expect(result.data).not.toBeDefined();
  });

  it("createResultNode should create a calculation node based on passed calculation type", () => {
    // arrange
    const resultType = ResultType.Prediction;
    const expectedNodeType = NodeType.Result;
    const expectedResultType = ResultType.Prediction;

    // act
    const result = createResultNode(resultType);

    // assert
    expect(result.id).toBeDefined();
    expect(result.resultType).toEqual(expectedResultType);
    expect(result.type).toEqual(expectedNodeType);
    expect(result.ref).not.toBeDefined();
  });
});
