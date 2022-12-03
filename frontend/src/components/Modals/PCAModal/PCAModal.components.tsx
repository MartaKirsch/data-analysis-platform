import styled from "styled-components";

export const PCAModalBody = styled.div`
  max-height: 70vh;

  overflow: auto;
`;

export const PCAModalInnerBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;
  padding: 20px 0;
`;

export const PCAModalSelectWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & > *:not(:first-child) {
    margin-left: 10px;
  }
`;
