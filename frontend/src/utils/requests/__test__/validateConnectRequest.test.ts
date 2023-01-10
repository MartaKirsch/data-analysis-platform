import { CalculationType } from "../../../types/Node";
import { DataCalculationConnectedRequestBody } from "../../../types/requests/DataCalculationConnectedRequest";
import { validateConnectRequest } from "../validateConnectRequest";

describe("validateConnectRequest", () => {
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

  describe("Linear Regression params validation", () => {
    it("should validate to false for no params set", () => {
      const req: DataCalculationConnectedRequestBody = {
        file: {} as File,
        type: "text/csv",
        calculationType: CalculationType.LinearRegression,
      };
      const expectedIsValid = false;

      // act
      const result = validateConnectRequest(req);

      // assert
      expect(result).toEqual(expectedIsValid);
    });

    it("should validate to false for not full set of indexes set", () => {
      const req: DataCalculationConnectedRequestBody = {
        file: {} as File,
        type: "text/csv",
        calculationType: CalculationType.LinearRegression,
        columnIndexes: [1],
      };
      const expectedIsValid = false;

      // act
      const result = validateConnectRequest(req);

      // assert
      expect(result).toEqual(expectedIsValid);
    });

    it("should validate to true for full set of indexes set", () => {
      const req: DataCalculationConnectedRequestBody = {
        file: {} as File,
        type: "text/csv",
        calculationType: CalculationType.LinearRegression,
        columnIndexes: [1, 2],
      };
      const expectedIsValid = true;

      // act
      const result = validateConnectRequest(req);

      // assert
      expect(result).toEqual(expectedIsValid);
    });
  });
});
