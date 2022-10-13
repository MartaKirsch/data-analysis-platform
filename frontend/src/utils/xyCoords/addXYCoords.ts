import { XYCoord } from "react-dnd";

export const addXYCoords = (...coords: XYCoord[]): XYCoord => ({
  x: coords.reduce((prev, current) => prev + current.x, 0),
  y: coords.reduce((prev, current) => prev + current.y, 0),
});
