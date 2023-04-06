import {GameManager} from "@/contexts/GameContext";
import {TimerContext} from "@/contexts/TimerContext";
import {RENDER} from "@/styles/theme";
import {useRouter} from "next/router";
import React, {useContext, useEffect, useState} from "react";
import Image from "next/legacy/image";
import styled from "styled-components";
import {UserContext} from "@/contexts/UserContext";
import {commaPerThousand} from "@/libs/client/utils";
import Loading from "./Loading";
import IconButton from "./IconButton";
import ErrorAlert from "./ErrorAlert";
import ExitIcon from "/public/arrow-right-from-bracket.svg";
import RestartIcon from "/public/arrow-roatate-left.svg";
import RankingIcon from "/public/ranking.svg";

const ResultBoard = () => {
  const {timer, handleCountDownStart, handleTimerInit, handleCountDownInit} =
    useContext(TimerContext);
  const {score, handleGameStart, handleGameInit, handleFetchRecord} =
    useContext(GameManager);
  const {name, handleNameInit} = useContext(UserContext);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const onRestart = async () => {
    setIsLoading((props) => !props);
    try {
      await handleFetchRecord(name, score);
    } catch (e) {
      setIsError(true);
      return;
    } finally {
      handleGameStart();
      handleTimerInit();
      setIsGameOver(false);
      handleCountDownStart();
      handleGameInit();
      setIsLoading(false);
    }
  };

  const onExit = async () => {
    setIsLoading((props) => !props);
    try {
      await handleFetchRecord(name, score);
    } catch (e) {
      setIsError(true);
      return;
    } finally {
      handleNameInit();
      router.push("/home");
    }
  };

  const onRanking = async () => {
    setIsLoading((props) => !props);
    try {
      await handleFetchRecord(name, score);
    } catch (e) {
      setIsError(true);
      return;
    } finally {
      handleNameInit();
      router.push("/ranking");
    }
  };

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
              <StyledScore>Score | {commaPerThousand(score)}</StyledScore>
            </div>
            <StyledButtonContainer>
              <IconButton onClick={onExit}>
                <ExitIcon width="30" />
              </IconButton>
              <IconButton onClick={onRanking}>
                <RankingIcon width="30" />
              </IconButton>
              <IconButton onClick={onRestart}>
                <RestartIcon width="30" />
              </IconButton>
            </StyledButtonContainer>
          </StyledContainer>
        </StyledLayout>
      )}
      {isLoading ? <Loading /> : null}
      {isError ? <ErrorAlert /> : null}
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
