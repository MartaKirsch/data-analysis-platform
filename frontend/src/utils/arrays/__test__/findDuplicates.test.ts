import { findDuplicates } from "../findDuplicates";

describe("findDuplicates", () => {
  it("should return empty array for array with no duplicates", () => {
    // arrange
    const arr = [1, 2, 3, 4, 5];
    const expectedResult: number[] = [];

    // act
    const result = findDuplicates(arr);

    // assert
    expect(result).toEqual(expectedResult);
  });

  it("should return duplicate array for array of numbers", () => {
    // arrange
    const arr = [1, 2, 3, 4, 5, 2, 1];
    const expectedResult: number[] = [2, 1];

    // act
    const result = findDuplicates(arr);
    // assert
    expect(result).toEqual(expectedResult);
  });

  it("should return duplicate array for array of objects when not passing equality check", () => {
    // arrange
    const arr = [
      { id: 1, name: "A" },
      { id: 2, name: "B" },
      { id: 1, name: "A" },
    ];
    const expectedResult: object[] = [{ id: 1, name: "A" }];

    // act
    const result = findDuplicates(arr);

    // assert
    expect(result).toEqual(expectedResult);
  });

  it("should return duplicate array for array of objects when passing equality check", () => {
    // arrange
    const arr = [
      { id: 1, name: "A" },
      { id: 2, name: "B" },
      { id: 1, name: "A" },
    ];
    const expectedResult: object[] = [{ id: 1, name: "A" }];

    // act
    const result = findDuplicates(arr, (a, b) => a.id === b.id);

    // assert
    expect(result).toEqual(expectedResult);
  });
});
