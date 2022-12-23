import { CalculationType } from "../../../types/Node";
import { DataCalculationConnectedRequestBody } from "../../../types/requests/DataCalculationConnectedRequest";
import { validateConnectRequest } from "../validateConnectRequest";

describe("validateConnectRequest", () => {
  it("should validate to true for a calculation type with no parameters", () => {
    // arrange
    const req: DataCalculationConnectedRequestBody = {
      file: {} as File,
      type: "text/csv",
      calculationType: CalculationType.LinearRegression,
    };
    const expectedIsValid = true;

    // act
    const result = validateConnectRequest(req);

    // assert
    expect(result).toEqual(expectedIsValid);
  });

  it("should validate to true for a calculation type with required parameters when they're passed", () => {
    // arrange
    const req: DataCalculationConnectedRequestBody = {
      file: {} as File,
      type: "text/csv",
      calculationType: CalculationType.DecisionTree,
      classes: "test",
    };
    const expectedIsValid = true;

    // act
    const result = validateConnectRequest(req);

    // assert
    expect(result).toEqual(expectedIsValid);
  });

  it("should validate to false for a calculation type with required parameters when none are passed", () => {
    // arrange
    const req: DataCalculationConnectedRequestBody = {
      file: {} as File,
      type: "text/csv",
      calculationType: CalculationType.DecisionTree,
    };
    const expectedIsValid = false;

    // act
    const result = validateConnectRequest(req);

    // assert
    expect(result).toEqual(expectedIsValid);
  });
});
