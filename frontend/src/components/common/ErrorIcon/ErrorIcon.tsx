import React, { FC } from "react";
import { ErrorIconWrapper } from "./ErrorIcon.components";
import { ReactComponent as ErrorIconSVG } from "../../../img/exclamation.svg";
import { ThemeType } from "../../../styles/themes/defaultTheme";

type ErrorIconProps = {
  size?: keyof ThemeType["dimensions"]["iconButton"];
};

const ErrorIcon: FC<ErrorIconProps> = ({ size = "xs" }) => {
  return (
    <ErrorIconWrapper size={size}>
      <ErrorIconSVG />
    </ErrorIconWrapper>
  );
};

export default ErrorIcon;
