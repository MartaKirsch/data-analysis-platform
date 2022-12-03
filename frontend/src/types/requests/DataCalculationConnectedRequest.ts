import { CalculationType } from "../Node";

export type DataCalculationConnectedRequest = FormData;

export type DataCalculationConnectedRequestBody = {
  file: File;
  calculationType: CalculationType;
  type: string;
  classes?: string;
};
