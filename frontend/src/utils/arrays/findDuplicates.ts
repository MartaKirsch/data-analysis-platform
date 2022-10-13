import { isEqual } from "lodash";

export const findDuplicates = <T>(arr: T[], equalityCheck = isEqual) => {
  return arr.filter(
    (item, index) => arr.findIndex((it) => equalityCheck(item, it)) !== index
  );
};
