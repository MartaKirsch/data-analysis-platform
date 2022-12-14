import React, { FC, useState } from "react";
import IconButton from "../common/IconButton";
import { HelpIconWrapper } from "./Help.components";
import { ReactComponent as HelpIcon } from "../../img/help.svg";
import NodeTippy from "../common/NodeTippy";
import HelpModal from "../Modals/HelpModal";

const Help: FC = () => {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  return (
    <>
      <NodeTippy content="Help">
        <HelpIconWrapper>
          <IconButton
            onClick={() => setIsHelpModalOpen(true)}
            shouldResize
            icon={<HelpIcon />}
            size="xs"
          />
        </HelpIconWrapper>
      </NodeTippy>
      {isHelpModalOpen && (
        <HelpModal onClose={() => setIsHelpModalOpen(false)} />
      )}
    </>
  );
};

export default Help;
