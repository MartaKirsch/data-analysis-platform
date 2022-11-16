import axios from "axios";
import { useBoardContext } from "../context/useBoardContext";
import { CalculationType } from "../types/Node";
import {
  DataCalculationConnectedRequest,
  DataCalculationConnectedRequestBody,
} from "../types/requests/DataCalculationConnectedRequest";
import { isAxiosError } from "../types/responses/isAxiosError";
import { isServerResponse } from "../types/responses/ServerResponse";

export const useSendDataCalculationConnected = () => {
  const { setNodeError } = useBoardContext();

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
    calculationNodeId: string,
    dataNodeId: string
  ) => {
    setNodeError(dataNodeId, undefined);
    const reqBody = createDataCalculationConnectedRequestBody(
      file,
      calculationType
    );
    const request = createDataCalculationConnectedRequest(reqBody);
    return axios
      .post<object>(`/calculate/${calculationNodeId}`, request)
      .catch((e) => {
        if (isAxiosError(e) && isServerResponse(e))
          setNodeError(dataNodeId, e.response?.data.response);
        else setNodeError(dataNodeId, "An unexpected error happened!");
      });
  };

  return { sendDataCalculationConnectedRequest };
};
