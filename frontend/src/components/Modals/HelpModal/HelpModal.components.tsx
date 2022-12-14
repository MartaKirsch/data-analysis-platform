import styled from "styled-components";

export const HelpModalBody = styled.div`
  max-height: 70vh;
  max-width: 500px;

  overflow: auto;
`;

export const HelpModalInnerBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;

export const HelpModalSection = styled.div`
  width: 100%;
  padding: 20px 0;

  display: flex;
  flex-direction: column;

  font-size: ${({ theme }) => theme.fonts.sizes.s};
  color: ${({ theme }) => theme.colors.modal.info.text};

  &:first-of-type {
    padding: 40px 0 20px;
  }
`;

export const HelpModalSectionHeader = styled.h2`
  margin-bottom: 10px;

  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  font-size: ${({ theme }) => theme.fonts.sizes.base};
  color: ${({ theme }) => theme.colors.modal.info.text};
`;

export const HelpModalSeparator = styled.div`
  height: 2px;
  width: 95%;
  background-color: ${({ theme }) => theme.colors.modal.info.text};
`;
