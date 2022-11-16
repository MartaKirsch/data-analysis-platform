import styled from "styled-components";

export const ErrorMessageBarWrapper = styled.div`
  display: flex;
  align-items: center;

  margin: 10px 0;
`;

export const ErrorMessageBarText = styled.span`
  font-size: ${({ theme }) => theme.fonts.sizes.base};
  color: ${({ theme }) => theme.colors.errorText};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};

  margin-left: 10px;
`;
