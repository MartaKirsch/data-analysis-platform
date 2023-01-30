import axios from "axios";
import { useState, useCallback } from "react";
import { ResultType } from "../types/Node";
import { GetResultRequest } from "../types/requests/GetResultRequest";
import { isAxiosError } from "../types/responses/isAxiosError";
import { isServerResponse } from "../types/responses/ServerResponse";

type Response = { predictedClass: string; predictedProbability: string };

export const useSendGetPredictionResultRequest = () => {
  const [error, setError] = useState<string>();
  const [prediction, setPrediction] = useState<string>();
  const [probability, setProbability] = useState<string>();

  const resetError = () => {
    setError(undefined);
  };

  const sendGetPredictionResultRequest = useCallback(
    (nodeId: string, resultType: ResultType, req: object) => {
      const request: GetResultRequest = { ...req, resultType: resultType };
      resetError();
      setPrediction(undefined);
      return axios
        .post<Response>(`/result/${nodeId}`, request)
        .then(async (res) => {
          setPrediction(res.data.predictedClass);
          setProbability(res.data.predictedProbability);
        })
        .catch((e) => {
          if (isAxiosError(e) && isServerResponse(e))
            setError(e.response?.data.response);
          else setError("An unexpected error happened!");
        });
    },
    []
  );

  return {
    sendGetPredictionResultRequest,
    error,
    prediction,
    probability,
    resetError,
  };
};
