import {createContext, useCallback, useEffect, useState} from "react";

const initialProps = {
  timer: 60,
  handleTimerStart: () => {},
};

const TimerContext = createContext(initialProps);

interface Props {
  children: JSX.Element | JSX.Element[];
  handleStart?: () => void;
}

const TimerProvider = ({children}: Props) => {
  const [timer, setTimer] = useState<number>(10);
  const [isWorkTimer, setIsWorkTimer] = useState<boolean>(false);
  const [startCount, setStartCount] = useState<boolean>(false);

  const handleWork = useCallback<() => void>(() => {
    setTimer((time) => time - 0.1);
  }, []);

  const handleTimerStart = useCallback(() => {
    setTimer(60);
    setIsWorkTimer(true);
  }, []);

  const handleStop = useCallback(() => {
    setTimer(0);
  }, []);

  useEffect(() => {
    const tick = handleWork;

    const timerId = setInterval(tick, 100);

    if (timer <= 0 || !isWorkTimer) {
      clearInterval(timerId);
      handleStop();
    }

    return () => clearInterval(timerId);
  }, [timer, handleStop, handleWork, isWorkTimer]);

  return (
    <TimerContext.Provider value={{timer, handleTimerStart}}>
      {children}
    </TimerContext.Provider>
  );
};

export {TimerContext, TimerProvider};
