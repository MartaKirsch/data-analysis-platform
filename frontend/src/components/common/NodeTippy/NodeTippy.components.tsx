import styled from "styled-components";

export const NodeTippyBg = styled.div`
  background-color: ${({ theme }) => theme.colors.tippy.bg};
  color: ${({ theme }) => theme.colors.tippy.text};

  padding: 10px;
  border-radius: 10px;
`;
