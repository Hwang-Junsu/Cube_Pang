import {UserContext} from "@/contexts/UserContext";
import {RENDER} from "@/styles/theme";
import {useRouter} from "next/router";
import React, {Dispatch, SetStateAction, useContext} from "react";
import styled from "styled-components";

import PlayIcon from "/public/play.svg";
import CancelIcon from "public/cancel.svg";
import IconButton from "./IconButton";
import Modal from "./Modal";

const NameChecker = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const {handleName} = useContext(UserContext);
  const router = useRouter();

  const onClickCancel = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsOpen((props) => !props);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // @ts-ignore
    const input = event.target[0].value.trim();

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
            <CancelIcon width="20" />
          </IconButton>
          <IconButton type="submit">
            <PlayIcon width="20" />
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
