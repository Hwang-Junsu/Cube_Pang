import React, {Dispatch, SetStateAction, useCallback, useState} from "react";
import Image from "next/legacy/image";
import styled from "styled-components";
import {v4 as uuid} from "uuid";
import Modal from "./Modal";
import exitIcon from "../../public/arrow-right-from-bracket.svg";
import leftIcon from "../../public/chevron-left-solid.svg";
import rightIcon from "../../public/chevron-right-solid.svg";
import {HOW_TO_PLAY_DATA} from "@/constants/constants";
import IconButton from "./IconButton";
import {RENDER} from "@/styles/theme";

const HowToPlay = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const onClickLeft = useCallback(() => {
    setPageNumber((number) =>
      number - 1 < 0 ? HOW_TO_PLAY_DATA.length - 1 : number - 1
    );
  }, [setPageNumber]);
  const onClickRight = useCallback(() => {
    setPageNumber((number) => (number + 1) % HOW_TO_PLAY_DATA.length);
  }, [setPageNumber]);

  return (
    <Modal height="600px">
      <StyledExitButton onClick={() => setIsOpen((props) => !props)}>
        <IconButton>
          <Image src={exitIcon} alt="exitIcon" width={30} height={30} />
        </IconButton>
      </StyledExitButton>

      <StyledSlider>
        <StyledContainer>
          <StyledIndex>{`${pageNumber + 1} / ${
            HOW_TO_PLAY_DATA.length
          }`}</StyledIndex>
          <StyledImageContainer>
            <StyledImage
              src={HOW_TO_PLAY_DATA[pageNumber].image}
              alt="howtoplay"
            />
          </StyledImageContainer>
          <StyledBottomContainer>
            {HOW_TO_PLAY_DATA[pageNumber].descriptions.map((description) => (
              <StyledDescription key={uuid()}>{description}</StyledDescription>
            ))}
          </StyledBottomContainer>
        </StyledContainer>
        <StyledButton direction="left" onClick={onClickLeft}>
          <IconButton>
            <Image src={leftIcon} alt="icon" width={30} height={30} />
          </IconButton>
        </StyledButton>
        <StyledButton direction="right" onClick={onClickRight}>
          <IconButton>
            <Image src={rightIcon} alt="icon" width={30} height={30} />
          </IconButton>
        </StyledButton>
      </StyledSlider>
    </Modal>
  );
};

export default HowToPlay;

const StyledExitButton = styled.button`
  position: absolute;
  top: 30px;
  right: 30px;
  background-color: transparent;
  border: none;
`;

const StyledSlider = styled.div`
  position: relative;
  width: 95%;
  height: 80%;
`;

const StyledContainer = styled.div`
  position: relative;
  height: 100%;
  flex-direction: column;
  align-items: center;
  display: flex;
  gap: 20px;
`;

const StyledIndex = styled.div`
  text-align: center;
  font-size: 17px;
  font-weight: 800;

  background-color: white;
  width: 100px;
  padding: 5px 10px;
  border-radius: 15px;
  box-shadow: ${(props) => props.theme.boxShadow.normal};
`;

const StyledButton = styled.button<{direction: string}>`
  position: absolute;
  ${(props) => (props.direction === "left" ? "left: -50px" : "right: -50px")};
  top: 50%;
  background-color: transparent;
  border: none;
`;

const StyledImageContainer = styled.div`
  position: relative;
  display: flex;
  height: 300px;
  box-shadow: ${(props) => props.theme.boxShadow.normal};
  border-radius: 15px;
  overflow: hidden;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  height: 300px;
`;

const StyledBottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  padding: 10px 5px;
  border-radius: 15px;

  box-shadow: ${(props) => props.theme.boxShadow.normal};
  ${RENDER.glassmophism}
`;

const StyledDescription = styled.div`
  font-weight: bold;
  font-size: 17px;
  letter-spacing: -1px;
  color: black;
`;
