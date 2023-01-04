import { XYCoord } from "react-dnd";
import { subXYCoords } from "../subXYCoords";

describe("subXYCoords", () => {
  it("should subtract positive coords", () => {
    // arrange
    const coords: XYCoord[] = [
      { x: 1, y: 2 },
      { x: 4, y: 1 },
    ];
    const expectedResult = { x: -3, y: 1 };

    // act
    const result = subXYCoords(coords[0], coords[1]);

    // assert
    expect(result.x).toEqual(expectedResult.x);
    expect(result.y).toEqual(expectedResult.y);
  });

  it("should subtract positive and negative coords", () => {
    // arrange
    const coords: XYCoord[] = [
      { x: 1, y: 2 },
      { x: -4, y: -1 },
    ];
    const expectedResult = { x: 5, y: 3 };

    // act
    const result = subXYCoords(coords[0], coords[1]);

    // assert
    expect(result.x).toEqual(expectedResult.x);
    expect(result.y).toEqual(expectedResult.y);
  });
});
