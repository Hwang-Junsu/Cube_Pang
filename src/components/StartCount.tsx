import React, {useEffect} from "react";
import styled from "styled-components";
import {useGameManager} from "@/contexts/GameContext";
import {useTimer} from "@/contexts/TimerContext";
import {appearAnimation} from "@/styles/animations";
import {RENDER} from "@/styles/theme";

const StartCount = () => {
  const {startCount, handleCountDownStart} = useTimer();
  const {isGamePlay, handleGameStart} = useGameManager();

  useEffect(() => {
    handleCountDownStart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!startCount && !isGamePlay) {
      handleGameStart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startCount]);

  return (
    <>
      {startCount > 0 && !isGamePlay && (
        <StyledLayout>
          <StyledCount>{startCount}</StyledCount>
        </StyledLayout>
      )}
    </>
  );
};

export default StartCount;

const StyledLayout = styled.div`
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;

  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.3);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCount = styled.div`
  font-weight: 600;
  font-size: 50px;
  color: white;
  ${RENDER.textShadow}

  font-family: "Russo One", sans-serif;
  opacity: 1;

  animation: ${appearAnimation()} 1.05s 3;
`;
