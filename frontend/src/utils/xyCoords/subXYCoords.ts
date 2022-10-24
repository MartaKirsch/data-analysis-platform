import { XYCoord } from "react-dnd";

export const subXYCoords = (
  minuend: XYCoord,
  subtrahend: XYCoord
): XYCoord => ({
  x: minuend.x - subtrahend.x,
  y: minuend.y - subtrahend.y,
});
