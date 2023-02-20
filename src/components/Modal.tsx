import {UserContext} from "@/contexts/UserContext";
import {RENDER} from "@/styles/theme";
import Image from "next/legacy/image";
import {useRouter} from "next/router";
import React, {Dispatch, SetStateAction, useContext} from "react";
import styled from "styled-components";

import playIcon from "/public/play.svg";
import cancelIcon from "public/cancel.svg";
import {tremblingAnimation} from "@/styles/animations";

const Modal = ({setIsOpen}: {setIsOpen: Dispatch<SetStateAction<boolean>>}) => {
  const {handleName} = useContext(UserContext);
  const router = useRouter();

  const onClickCancel = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsOpen((props) => !props);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // @ts-ignore
    const input = event.target[0].value;

    if (input === "" || input.length > 6) return;

    handleName(input);
    router.push("/");
  };

  return (
    <StyledLayout>
      <StyledContainer>
        <StyledTitle>닉네임을 작성해주세요</StyledTitle>
        <StyledForm onSubmit={handleSubmit}>
          <StyledInput
            type="text"
            placeholder="6자 이내의 닉네임을 작성해주세요"
          />
          <StyledButtonContainer>
            <StyledButton type="button" onClick={onClickCancel}>
              <Image src={cancelIcon} width={30} height={30} alt="exit" />
            </StyledButton>
            <StyledButton type="submit">
              <Image src={playIcon} width={30} height={30} alt="exit" />
            </StyledButton>
          </StyledButtonContainer>
        </StyledForm>
      </StyledContainer>
    </StyledLayout>
  );
};

export default Modal;

const StyledLayout = styled.div`
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;

  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.1);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledContainer = styled.div`
  position: relative;
  width: 500px;
  height: 350px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding: 0px 50px;

  border-radius: 20px;
  box-shadow: ${(props) => props.theme.boxShadow.normal};
  ${RENDER.glassmophism};
`;

const StyledTitle = styled.div`
  position: absolute;
  top: 50px;

  font-size: 25px;
  font-weight: 600;

  color: black;
`;

const StyledForm = styled.form`
  position: relative;
`;

const StyledButtonContainer = styled.div`
  position: absolute;
  top: 100px;
  width: 300px;
  display: flex;
  justify-content: space-between;
`;

const StyledButton = styled.button`
  width: 50px;
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;

  cursor: pointer;

  box-shadow: ${(props) => props.theme.boxShadow.normal};
  ${RENDER.glassmophism}

  &:active {
    box-shadow: none;
    transition: all 0.3s ease-in-out;
    animation: ${tremblingAnimation()} 0.1s infinite;
  }

  &:hover {
    transform: scale(1.05);
    transition: all 0.3s ease-in-out;
  }
`;

const StyledInput = styled.input`
  padding: 20px;
  border-radius: 15px;
  border: none;

  width: 300px;

  text-align: center;
  font-size: 1rem;
  box-shadow: ${(props) => props.theme.boxShadow.normal};
  ${RENDER.textShadow};
`;
