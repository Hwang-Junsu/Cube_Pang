import {COUNTDOWN_TIME, PLAY_TIME} from "@/constants/constants";
import {ITimerContextProps} from "@/types/logic";
import {Props} from "@/types/types";
import {createContext, useCallback, useEffect, useState} from "react";

const initialProps: ITimerContextProps = {
  timer: PLAY_TIME,
  handleTimerStart: () => {},
  handleCountDownStart: () => {},
  handleTimerInit: () => {},
  handleCountDownInit: () => {},
  startCount: COUNTDOWN_TIME,
  isWorkTimer: false,
};

const TimerContext = createContext(initialProps);

const TimerProvider = ({children}: Props) => {
  const [timer, setTimer] = useState<number>(PLAY_TIME);
  const [isWorkTimer, setIsWorkTimer] = useState<boolean>(false);
  const [startCount, setStartCount] = useState<number>(COUNTDOWN_TIME);
  const [isCountDown, setIsCountDown] = useState<boolean>(false);

  const handleWork = useCallback<() => void>(() => {
    setTimer((time) => time - 0.1);
  }, []);

  const handleCountDown = useCallback(() => {
    setStartCount((count) => count - 1);
  }, []);

  const handleTimerStart = useCallback(() => {
    setTimer(PLAY_TIME);
    setIsWorkTimer(true);
  }, []);

  const handleCountDownStart = useCallback(() => {
    setStartCount(COUNTDOWN_TIME);
    setIsCountDown(true);
  }, []);

  const handleTimerInit = useCallback(() => {
    setTimer(PLAY_TIME);
    setIsWorkTimer(false);
  }, []);

  const handleCountDownInit = useCallback(() => {
    setStartCount(COUNTDOWN_TIME);
    setIsCountDown(false);
  }, []);

  useEffect(() => {
    const tick = handleWork;
    let timerId: NodeJS.Timer;

    if (isWorkTimer) {
      timerId = setInterval(tick, 100);

      if (timer <= 0 || !isWorkTimer) {
        clearInterval(timerId);
        handleTimerInit();
      }
    }

    return () => clearInterval(timerId);
  }, [timer, handleTimerInit, handleWork, isWorkTimer]);

  useEffect(() => {
    const tick = handleCountDown;
    let timerId: NodeJS.Timer;
    if (isCountDown) {
      timerId = setInterval(tick, 1000);

      if (startCount <= 0) {
        clearInterval(timerId);
        handleTimerStart();
      }
    }

    return () => clearInterval(timerId);
  }, [startCount, handleCountDown, handleTimerStart, isCountDown]);

  return (
    <TimerContext.Provider
      value={{
        timer,
        handleTimerStart,
        handleTimerInit,
        startCount,
        isWorkTimer,
        handleCountDownStart,
        handleCountDownInit,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export {TimerContext, TimerProvider};
