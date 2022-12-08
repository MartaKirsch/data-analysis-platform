import React, { FC } from "react";
import { useTheme } from "styled-components";
import Modal from "../../common/Modal/Modal";
import {
  HelpModalBody,
  HelpModalInnerBody,
  HelpModalSection,
  HelpModalSectionHeader,
  HelpModalSeparator,
} from "./HelpModal.components";

interface HelpModalProps {
  onClose: () => void;
}

const HelpModal: FC<HelpModalProps> = ({ onClose }) => {
  const theme = useTheme();
  return (
    <Modal
      modalHeader={{
        text: "Application Help",
        backgroundColor: theme.colors.modal.info.accent,
        color: theme.colors.modal.info.text,
      }}
      onClose={onClose}
      backgroundColor={theme.colors.modal.info.background}
    >
      <HelpModalBody>
        <HelpModalInnerBody>
          <HelpModalSection>
            <HelpModalSectionHeader>Types of nodes</HelpModalSectionHeader>
            There are three types of nodes - data, calculation and result. Data
            nodes are data providers. Calculation nodes say what kind of
            operation you want to perform. Some calculation nodes need
            parameters to complete the operation. Result nodes say what kind of
            result you want to get and see from the calculation.
          </HelpModalSection>
          <HelpModalSeparator />
          <HelpModalSection>
            <HelpModalSectionHeader>Placing nodes</HelpModalSectionHeader>
            To place nodes on the board you may simply drag them from the aside
            panel and drop them where you wish to. To connect the nodes, you may
            drag and drop them on one another. To disconnect two nodes you may
            click on the line connecting them. To complete a node tree and see
            results you need a data node, a calculation node and a result node,
            connected in this order. Keep in mind some types of nodes may be
            incompatible with others, e.g. you cannot connect a data node
            directly to a result node. Different calculation types might not
            support some result types too.
          </HelpModalSection>
          <HelpModalSeparator />
          <HelpModalSection>
            <HelpModalSectionHeader>Tooltip hints</HelpModalSectionHeader>
            If you feel lost, try hovering over an element of the interface. It
            should trigger a tooltip with some description, to shortly introduce
            its purpose.
          </HelpModalSection>
          <HelpModalSeparator />
          <HelpModalSection>
            <HelpModalSectionHeader>Color themes</HelpModalSectionHeader>
            In the bottom left corner you may see a button with color palette
            icon. This is a theme changer. If you click it, some color
            visualizing icons will show up. You may move between the theme pages
            with visible arrow buttons. Some themes have been prepared for
            visually impaired people, so be sure to explore all options to
            choose the best one for yourself.
          </HelpModalSection>
        </HelpModalInnerBody>
      </HelpModalBody>
    </Modal>
  );
};

export default HelpModal;
