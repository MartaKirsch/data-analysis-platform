import axios from "axios";
import { CalculationType } from "../types/Node";
import {
  DataCalculationConnectedRequest,
  DataCalculationConnectedRequestBody,
} from "../types/requests/DataCalculationConnectedRequest";

export const useSendDataCalculationConnected = () => {
  const createDataCalculationConnectedRequestBody = (
    file: File,
    calculationType: CalculationType
  ): DataCalculationConnectedRequestBody => ({
    file,
    calculationType,
    type: file.type,
  });

  const createDataCalculationConnectedRequest = (
    reqBody: DataCalculationConnectedRequestBody
  ): DataCalculationConnectedRequest => {
    const request = new FormData();
    request.append("file", reqBody.file);
    request.append("type", reqBody.type);
    request.append("calculationType", reqBody.calculationType);
    return request;
  };

  const sendDataCalculationConnectedRequest = (
    file: File,
    calculationType: CalculationType,
    nodeId: string
  ) => {
    const reqBody = createDataCalculationConnectedRequestBody(
      file,
      calculationType
    );
    const request = createDataCalculationConnectedRequest(reqBody);
    return axios.post<object>(`/calculate/${nodeId}`, request).then((res) => {
      console.log(res);
    });
  };

  return { sendDataCalculationConnectedRequest };
};
