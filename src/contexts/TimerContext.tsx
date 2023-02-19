import {createContext, useCallback, useEffect, useState} from "react";

const initialProps = {
  timer: 60,
  handleTimerStart: () => {},
  handleCountDownStart: () => {},
  handleTimerInit: () => {},
  handleCountDownInit: () => {},
  startCount: 3,
  isWorkTimer: false,
};

const TimerContext = createContext(initialProps);

interface Props {
  children: JSX.Element | JSX.Element[];
  handleStart?: () => void;
}

const TimerProvider = ({children}: Props) => {
  const [timer, setTimer] = useState<number>(60);
  const [isWorkTimer, setIsWorkTimer] = useState<boolean>(false);
  const [startCount, setStartCount] = useState<number>(3);
  const [isCountDown, setIsCountDown] = useState<boolean>(false);

  const handleWork = useCallback<() => void>(() => {
    setTimer((time) => time - 0.1);
  }, []);

  const handleCountDown = useCallback(() => {
    setStartCount((count) => count - 1);
  }, []);

  const handleTimerStart = useCallback(() => {
    setTimer(60);
    setIsWorkTimer(true);
  }, []);

  const handleCountDownStart = useCallback(() => {
    setStartCount(3);
    setIsCountDown(true);
  }, []);

  const handleTimerInit = useCallback(() => {
    setTimer(60);
    setIsWorkTimer(false);
  }, []);

  const handleCountDownInit = useCallback(() => {
    setStartCount(3);
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
