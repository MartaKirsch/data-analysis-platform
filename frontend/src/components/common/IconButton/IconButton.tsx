import React, { FC, ReactNode } from "react";
import { ThemeType } from "../../../styles/themes/defaultTheme";
import { IconButtonWrapper } from "./IconButton.components";

export type IconButtonProps = {
  icon: ReactNode;
  size?: keyof ThemeType["dimensions"]["iconButton"];
  onClick?: () => void;
  shouldResize?: boolean;
};

const IconButton: FC<IconButtonProps> = ({
  icon,
  size = "md",
  onClick,
  shouldResize,
}) => {
  return (
    <IconButtonWrapper
      size={size}
      onClick={onClick}
      shouldResize={shouldResize}
    >
      {icon}
    </IconButtonWrapper>
  );
};

export default IconButton;
