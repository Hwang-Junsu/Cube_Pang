import {GameManager} from "@/contexts/GameManager";
import {TimerContext} from "@/contexts/TimerContext";
import {RENDER} from "@/styles/theme";
import {useRouter} from "next/router";
import React, {useContext, useEffect, useState} from "react";
import styled from "styled-components";

const ResultBoard = () => {
  const {timer, handleCountDownInit} = useContext(TimerContext);
  const {score} = useContext(GameManager);
  const [isGameOver, setIsGameOver] = useState(false);

  const router = useRouter();

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
                뒤로가기
              </StyledButton>
              <StyledButton>다시하기</StyledButton>
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
  gap: 70px;

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
`;
