import { XYCoord } from "react-dnd";
import { addXYCoords } from "../addXYCoords";

describe("addXYCoords", () => {
  it("should add multiple positive coords", () => {
    // arrange
    const coords: XYCoord[] = [
      { x: 1, y: 2 },
      { x: 4, y: 1 },
      { x: 12, y: 21 },
    ];
    const expectedResult = { x: 17, y: 24 };

    // act
    const result = addXYCoords(...coords);

    // assert
    expect(result.x).toEqual(expectedResult.x);
    expect(result.y).toEqual(expectedResult.y);
  });

  it("should add multiple positive and negative coords", () => {
    // arrange
    const coords: XYCoord[] = [
      { x: 1, y: 2 },
      { x: -4, y: 1 },
      { x: 12, y: -21 },
    ];
    const expectedResult = { x: 9, y: -18 };

    // act
    const result = addXYCoords(...coords);

    // assert
    expect(result.x).toEqual(expectedResult.x);
    expect(result.y).toEqual(expectedResult.y);
  });
});
