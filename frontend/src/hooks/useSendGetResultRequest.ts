import axios, { AxiosResponseHeaders } from "axios";
import { useCallback, useEffect, useState } from "react";
import { ResultType } from "../types/Node";
import { GetResultRequest } from "../types/requests/GetResultRequest";

export const useSendGetResultRequest = () => {
  const [plotUrl, setPlotUrl] = useState("");
  const [plotFilename, setPlotFilename] = useState("");

  const sendGetPlotRequest = useCallback(
    (nodeId: string, resultType: ResultType) => {
      const request: GetResultRequest = { resultType: resultType };
      return axios
        .post<Blob>(`/result/${nodeId}`, request, {
          responseType: "blob",
        })
        .then(async (res) => {
          const filename = extractFilenameFromHeaders(res.headers);
          const fileBlob = res.data;
          const link = window.URL.createObjectURL(fileBlob);

          setPlotFilename(filename);
          setPlotUrl(link);
        })
        .catch((e) => console.log("e ", e.data));
    },
    []
  );

  useEffect(() => {
    return () => window.URL.revokeObjectURL(plotUrl);
  }, [plotUrl]);

  const extractFilenameFromHeaders = (
    headers:
      | AxiosResponseHeaders
      | Partial<
          Record<string, string> & { "set-cookie"?: string[] | undefined }
        >
  ) => {
    const disposition = headers["content-disposition"] || "";
    const filename = disposition.split("filename=")[1];
    return filename;
  };

  return { sendGetPlotRequest, plotUrl, plotFilename };
};
