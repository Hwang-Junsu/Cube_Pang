import { TimerContext } from "@/contexts/TimerContext";
import { RENDER } from "@/styles/theme";
import React, { useContext } from "react";
import styled from "styled-components";

const Timer = () => {
  const { timer, handleTimerStart } = useContext(TimerContext);

  return (
    <StyledTimer onClick={handleTimerStart}>
      Remain Time | {timer.toFixed(1)}
    </StyledTimer>
  );
};

export default Timer;

const StyledTimer = styled.div`
  padding: 10px 30px;
  border-radius: 15px;

  text-align: center;
  font-weight: 600;
  color: white;
  text-shadow: 2px 4px 10px rgba(48, 57, 121, 0.69);
  font-size: 23px;

  white-space: nowrap;

  ${RENDER.glassmophism};
`;
