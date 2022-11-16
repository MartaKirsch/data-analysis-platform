import React, { FC } from "react";
import ErrorIcon from "../ErrorIcon";
import {
  ErrorMessageBarText,
  ErrorMessageBarWrapper,
} from "./ErrorMessageBar.components";

interface ErrorMessageBarProps {
  message: string;
}

const ErrorMessageBar: FC<ErrorMessageBarProps> = ({ message }) => {
  return (
    <ErrorMessageBarWrapper>
      <ErrorIcon size="md" />
      <ErrorMessageBarText>{message}</ErrorMessageBarText>
    </ErrorMessageBarWrapper>
  );
};

export default ErrorMessageBar;
