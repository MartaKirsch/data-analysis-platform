import styled from "styled-components";
import { ReactComponent as Icon } from "../../../img/themeIcon.svg";

export default styled(Icon)<{
  $primaryColor: string;
  $secondaryColor: string;
}>`
  circle {
    fill: ${({ $primaryColor }) => $primaryColor};
  }

  path {
    fill: ${({ $secondaryColor }) => $secondaryColor};
  }

  width: 100%;
  height: 100%;
`;
