import React, { FC, ReactNode } from "react";
import { ThemeType } from "../../../styles/themes/defaultTheme";
import { IconButtonWrapper } from "./IconButton.components";

export type IconButtonProps = {
  icon: ReactNode;
  size?: keyof ThemeType["dimensions"]["iconButton"];
  onClick?: () => void;
};

const IconButton: FC<IconButtonProps> = ({ icon, size = "md", onClick }) => {
  return (
    <IconButtonWrapper size={size} onClick={onClick}>
      {icon}
    </IconButtonWrapper>
  );
};

export default IconButton;
