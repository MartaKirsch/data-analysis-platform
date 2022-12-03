import React, { FC } from "react";
import { ThemeType } from "../../../styles/themes/defaultTheme";
import ErrorIcon from "../ErrorIcon";
import {
  ErrorMessageBarText,
  ErrorMessageBarWrapper,
} from "./ErrorMessageBar.components";

interface ErrorMessageBarProps {
  message: string;
  size?: "xs" | "sm" | "md" | "lg" | undefined;
}

const ErrorMessageBar: FC<ErrorMessageBarProps> = ({
  message,
  size = "md",
}) => {
  const mapIconSizeToFontSize = (
    iconSize: "xs" | "sm" | "md" | "lg" | undefined
  ): keyof ThemeType["fonts"]["sizes"] => {
    switch (iconSize) {
      case "xs":
      case "sm":
        return "s";
      case "md":
        return "base";
      case "lg":
        return "m";
      default:
        return "base";
    }
  };

  return (
    <ErrorMessageBarWrapper>
      <ErrorIcon size={size} />
      <ErrorMessageBarText size={mapIconSizeToFontSize(size)}>
        {message}
      </ErrorMessageBarText>
    </ErrorMessageBarWrapper>
  );
};

export default ErrorMessageBar;
