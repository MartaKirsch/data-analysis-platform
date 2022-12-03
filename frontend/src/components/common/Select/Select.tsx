import styled from "styled-components";
import { modalButton } from "../../../styles/mixins";

export const Select = styled.select`
  ${modalButton}

  font-family:${({ theme }) => theme.fonts.families.normal};

  border: none;
  outline: none;
`;

export const Option = styled.option`
  font-family: ${({ theme }) => theme.fonts.families.normal};
`;

export const Label = styled.label`
  font-family: ${({ theme }) => theme.fonts.families.normal};
  font-size: ${({ theme }) => theme.fonts.sizes.s};
`;
