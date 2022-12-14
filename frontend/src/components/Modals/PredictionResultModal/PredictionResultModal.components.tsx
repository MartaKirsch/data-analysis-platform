import styled from "styled-components";
import { modalButton } from "../../../styles/mixins";

export const PredictionResultModalBody = styled.div`
  max-height: 70vh;

  overflow: auto;
  width: 100%;
`;

export const PredictionResultModalInnerBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  width: 100%;
`;

export const PredictionResultModalButton = styled.button`
  ${modalButton}
  margin-top: 42px;
`;

export const PredictionResultModalRow = styled.div`
  width: 500px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:not(:first-of-type) {
    margin-top: 20px;
  }

  @-moz-document url-prefix() {
    padding-left: 17px;
  }
`;

export const PredictionResultModalInput = styled.input`
  background-color: ${({ theme }) => theme.colors.modal.button.background};
  color: ${({ theme }) => theme.colors.modal.button.text};

  padding: 10px 30px;

  border-radius: 15px;

  font-size: ${({ theme }) => theme.fonts.sizes.s};
  font-family: ${({ theme }) => theme.fonts.families.normal};

  margin-left: 40px;
  width: 250px;
`;
