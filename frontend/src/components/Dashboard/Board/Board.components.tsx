import styled from "styled-components";

export const BoardWrapper = styled.div`
  width: calc(100vw - ${({ theme }) => theme.dimensions.aside.width});
  height: 100vh;

  position: relative;
`;
