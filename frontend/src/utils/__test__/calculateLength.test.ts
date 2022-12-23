import { calculateLength } from "../calculateLength";

describe("calculateLength", () => {
  it("should calulate Length properly for p1 and p2 in 1st quarter", () => {
    // arrange
    const p1 = { x: 1, y: 1 };
    const p2 = { x: 4, y: 3 };
    const expectedLength = 3;

    // act
    const result = calculateLength(p1.x, p1.y, p2.x, p2.y);

    // assert
    expect(result).toEqual(expectedLength);
  });

  it("should calulate Length properly for p1 and p2 in 2nd quarter", () => {
    // arrange
    const p1 = { x: -1, y: 1 };
    const p2 = { x: -4, y: 3 };
    const expectedLength = 3;

    // act
    const result = calculateLength(p1.x, p1.y, p2.x, p2.y);

    // assert
    expect(result).toEqual(expectedLength);
  });

  it("should calulate Length properly for p1 and p2 in 3rd quarter", () => {
    // arrange
    const p1 = { x: -1, y: -1 };
    const p2 = { x: -4, y: -3 };
    const expectedLength = 3;

    // act
    const result = calculateLength(p1.x, p1.y, p2.x, p2.y);

    // assert
    expect(result).toEqual(expectedLength);
  });

  it("should calulate Length properly for p1 and p2 in 4th quarter", () => {
    // arrange
    const p1 = { x: 1, y: -1 };
    const p2 = { x: 4, y: -3 };
    const expectedLength = 3;

    // act
    const result = calculateLength(p1.x, p1.y, p2.x, p2.y);

    // assert
    expect(result).toEqual(expectedLength);
  });

  it("should calulate Length properly for p1 and p2 in mixed quarters", () => {
    // arrange
    const p1 = { x: -1, y: -1 };
    const p2 = { x: 2, y: 1 };
    const expectedLength = 3;

    // act
    const result = calculateLength(p1.x, p1.y, p2.x, p2.y);

    // assert
    expect(result).toEqual(expectedLength);
  });
});
