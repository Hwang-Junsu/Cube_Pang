import {GameManager} from "@/contexts/GameManager";
import {TimerContext} from "@/contexts/TimerContext";
import React, {useContext, useEffect} from "react";
import styled from "styled-components";

const StartCount = () => {
  const {startCount, handleCountDownStart} = useContext(TimerContext);
  const {isGamePlay, handleGameStart} = useContext(GameManager);

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
      {startCount > 0 && (
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
  opacity: 1;
`;
