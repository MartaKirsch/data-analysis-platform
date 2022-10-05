import { isEqual } from "lodash";

export const intersection = <T>(
  array1: T[],
  array2: T[],
  equalityCondition = isEqual
) => array1.filter((el1) => array2.some((el2) => equalityCondition(el1, el2)));
