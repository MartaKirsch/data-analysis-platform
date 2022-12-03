import axios from "axios";
import { useBoardContext } from "../context/useBoardContext";
import { CalculationNodeParameters, CalculationType } from "../types/Node";
import {
  DataCalculationConnectedRequest,
  DataCalculationConnectedRequestBody,
} from "../types/requests/DataCalculationConnectedRequest";
import { isAxiosError } from "../types/responses/isAxiosError";
import { isServerResponse } from "../types/responses/ServerResponse";
import { validateConnectRequest } from "../utils/requests/validateConnectRequest";

export const useSendDataCalculationConnected = () => {
  const { setNodeError } = useBoardContext();

  const createDataCalculationConnectedRequestBody = (
    file: File,
    calculationType: CalculationType,
    parameters?: CalculationNodeParameters
  ): DataCalculationConnectedRequestBody => ({
    file,
    calculationType,
    type: file.type,
    classes: parameters?.Column,
  });

  const createDataCalculationConnectedRequest = (
    reqBody: DataCalculationConnectedRequestBody
  ): DataCalculationConnectedRequest => {
    const request = new FormData();
    request.append("file", reqBody.file);
    request.append("type", reqBody.type);
    request.append("calculationType", reqBody.calculationType);
    request.append("classes", reqBody.classes || "");
    return request;
  };

  const sendDataCalculationConnectedRequest = ({
    file,
    calculationType,
    calculationNodeId,
    dataNodeId,
    parameters,
  }: SendDataCalculationConnectedRequestArgs) => {
    setNodeError(dataNodeId, undefined);
    setNodeError(calculationNodeId, undefined);

    const reqBody = createDataCalculationConnectedRequestBody(
      file,
      calculationType,
      parameters
    );
    const isValid = validateConnectRequest(reqBody);
    if (!isValid) {
      setNodeError(calculationNodeId, "Invalid parameters!");
      return;
    }
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

type SendDataCalculationConnectedRequestArgs = {
  file: File;
  calculationType: CalculationType;
  calculationNodeId: string;
  dataNodeId: string;
  parameters?: CalculationNodeParameters;
};
