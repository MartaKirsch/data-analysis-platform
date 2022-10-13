export const calculateLength = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => Math.floor(Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)));
