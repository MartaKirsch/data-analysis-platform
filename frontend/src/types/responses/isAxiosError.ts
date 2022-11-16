import { AxiosError } from "axios";

export const isAxiosError = (e: Error | AxiosError): e is AxiosError => {
  return (e as AxiosError).isAxiosError;
};
