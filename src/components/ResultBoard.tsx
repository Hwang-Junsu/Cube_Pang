import {GameManager} from "@/contexts/GameManager";
import {TimerContext} from "@/contexts/TimerContext";
import {RENDER} from "@/styles/theme";
import {useRouter} from "next/router";
import React, {useCallback, useContext, useEffect, useState} from "react";
import Image from "next/legacy/image";
import exitIcon from "/public/arrow-right-from-bracket.svg";
import restartIcon from "/public/arrow-roatate-left.svg";
import styled from "styled-components";

const ResultBoard = () => {
  const {timer, handleCountDownStart, handleTimerInit, handleCountDownInit} =
    useContext(TimerContext);
  const {score, handleGameStart, handleGameInit} = useContext(GameManager);
  const [isGameOver, setIsGameOver] = useState(false);

  const router = useRouter();

  const onRestart = useCallback(() => {
    handleGameStart();
    handleTimerInit();
    setIsGameOver(false);
    handleCountDownStart();
    handleGameInit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      setIsGameOver(true);
      handleCountDownInit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  return (
    <>
      {isGameOver && (
        <StyledLayout>
          <StyledContainer>
            <StyledResult>Result</StyledResult>
            <div>
              <StyledScore>Score | {score}</StyledScore>
              <StyledScore>Top Score | {score}</StyledScore>
            </div>
            <StyledButtonContainer>
              <StyledButton onClick={() => router.push("/home")}>
                <Image src={exitIcon} width={30} height={30} alt="exit" />
              </StyledButton>
              <StyledButton onClick={() => onRestart()}>
                <Image src={restartIcon} width={30} height={30} alt="restart" />
              </StyledButton>
            </StyledButtonContainer>
          </StyledContainer>
        </StyledLayout>
      )}
    </>
  );
};

export default ResultBoard;

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
  width: 500px;
  height: 350px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 50px;

  padding: 0px 50px;

  border-radius: 20px;
  box-shadow: ${(props) => props.theme.boxShadow.normal};
  ${RENDER.glassmophism};
`;

const StyledResult = styled.div`
  font-size: 3rem;
  font-weight: bold;
`;
const StyledScore = styled.div`
  font-size: 2rem;
  font-weight: 600;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StyledButton = styled.button`
  width: 50px;
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;

  box-shadow: ${(props) => props.theme.boxShadow.normal};
  ${RENDER.glassmophism}

  &:hover {
    transform: scale(1.05);
    transition: all 0.3s ease-in-out;
  }
`;
