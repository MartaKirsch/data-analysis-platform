import { CalculationType, ResultType } from "./Node";

export type CalculationNodeReference = {
  id: string;
  calculationType: CalculationType;
};

export type ResultNodeReference = {
  id: string;
  resultType: ResultType;
};
