import styled from "styled-components";

export const PageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background};

  height: 100vh;
  width: 100vw;

  display: flex;

  position: relative;
`;
