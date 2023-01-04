import styled from "styled-components";

export const LinearRegressionModalSelectWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & > *:not(:first-child) {
    margin-left: 10px;
  }

  &:first-of-type {
    margin-bottom: 20px;
  }
`;
