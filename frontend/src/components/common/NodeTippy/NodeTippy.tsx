import Tippy, { TippyProps } from "@tippyjs/react/headless";
import React, { FC } from "react";
import { NodeTippyBg } from "./NodeTippy.components";

interface NodeTippyProps extends TippyProps {}

const NodeTippy: FC<NodeTippyProps> = ({ children, content }) => {
  return (
    <Tippy
      delay={500}
      render={(attrs) => <NodeTippyBg {...attrs}>{content}</NodeTippyBg>}
    >
      {children}
    </Tippy>
  );
};

export default NodeTippy;
