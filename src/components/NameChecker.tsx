import React, {Dispatch, SetStateAction} from "react";
import Image from "next/legacy/image";
import {useRouter} from "next/router";
import styled from "styled-components";
import {useUser} from "@/contexts/UserContext";
import {RENDER} from "@/styles/theme";

import playIcon from "/public/play.svg";
import cancelIcon from "public/cancel.svg";
import IconButton from "./IconButton";
import Modal from "./Modal";

const NameChecker = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const {handleName} = useUser();
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
    <Modal>
      <StyledTitle>닉네임을 작성해주세요</StyledTitle>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          type="text"
          placeholder="6자 이내의 닉네임을 작성해주세요"
        />
        <StyledButtonContainer>
          <IconButton onClick={onClickCancel}>
            <Image src={cancelIcon} width={30} height={30} alt="exit" />
          </IconButton>
          <IconButton type="submit">
            <Image src={playIcon} width={30} height={30} alt="exit" />
          </IconButton>
        </StyledButtonContainer>
      </StyledForm>
    </Modal>
  );
};

export default NameChecker;

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

const StyledInput = styled.input`
  padding: 20px;
  border-radius: 15px;
  border: none;

  width: 300px;

  text-align: center;
  font-size: 1rem;
  outline: none;
  box-shadow: ${(props) => props.theme.boxShadow.normal};
  ${RENDER.textShadow};
`;
