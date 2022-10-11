import styled from "styled-components";

export const ModalWrapper = styled.div`
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalInnerWrapper = styled.div<{ backgroundColor: string }>`
  -webkit-box-shadow: 0px 0px 150px 150px
    ${({ theme }) => theme.colors.background};
  -moz-box-shadow: 0px 0px 150px 150px ${({ theme }) => theme.colors.background};
  box-shadow: 0px 0px 150px 150px ${({ theme }) => theme.colors.background};

  position: relative;

  padding: 40px;
  border-radius: 15px;

  background-color: ${({ backgroundColor }) => backgroundColor};

  min-width: 450px;
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;

  height: 20px;
  width: 20px;

  padding: 0;

  &:hover svg,
  &:focus svg {
    transform: scale(1.2);
  }

  svg {
    height: 100%;
    width: 100%;

    fill: ${({ theme }) => theme.colors.modal.closeIconFill};

    transform: scale(1);
    transform-origin: 50% 50%;
    transition: transform ease-out 0.2s;
  }

  background-color: transparent;
`;

export const ModalHeader = styled.h1<{ backgroundColor: string }>`
  font-size: ${({ theme }) => theme.fonts.sizes.m};
  position: relative;

  padding-bottom: 5px;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;

    height: 3px;
    width: 100%;

    background-color: ${({ backgroundColor }) => backgroundColor};
  }
`;
