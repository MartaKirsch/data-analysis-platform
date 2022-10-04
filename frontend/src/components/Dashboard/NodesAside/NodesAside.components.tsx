import styled from "styled-components";

export const NodesAsideWrapper = styled.aside`
  width: var(--nodes-aside-width);
  height: 100vh;

  background-color: ${({ theme }) => theme.colors.aside.background};
`;

export const NodesAsideRow = styled.div`
  width: 100%;
  padding: 50px;

  position: relative;

  &:not(:last-child)::after {
    background-color: ${({ theme }) => theme.colors.aside.rowSeparator};
    content: "";

    position: absolute;
    bottom: 0;
    left: 10%;

    width: 80%;
    height: 4px;
  }
`;
