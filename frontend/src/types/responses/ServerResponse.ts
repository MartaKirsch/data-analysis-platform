import { AxiosError } from "axios";

export type ServerResponse = AxiosError<{ response: string }>;

export const isServerResponse = (
  e: AxiosError | ServerResponse
): e is ServerResponse => {
  return typeof (e as ServerResponse).response?.data.response === "string";
};
