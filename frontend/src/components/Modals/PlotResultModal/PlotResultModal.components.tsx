import styled from "styled-components";
import { modalButton } from "../../../styles/mixins";

export const PlotResultModalLink = styled.a`
  ${modalButton}
  margin-top: 42px;
`;

export const PlotResultModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  width: 100%;
  max-height: 70vh;

  overflow: auto;
`;

export const PlotResultModalImage = styled.img`
  margin-top: 42px;
`;
