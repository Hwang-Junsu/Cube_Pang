import Layout from "@/components/Layout";
import {NextPage} from "next/types";
import styled from "styled-components";
import Board from "@/components/Board";
import ScoreBoard from "@/components/ScoreBoard";
import Timer from "@/components/Timer";
import StartCount from "@/components/StartCount";
import ResultBoard from "@/components/ResultBoard";
import {GameProvider} from "@/contexts/GameContext";
import {TimerProvider} from "@/contexts/TimerContext";

const Home: NextPage = () => {
  return (
    <TimerProvider>
      <GameProvider>
        <Layout seoTitle="Game">
          <StyledContainer>
            <StyledGameInfoContainer>
              <Timer />
              <ScoreBoard />
            </StyledGameInfoContainer>
            <Board />
          </StyledContainer>
          <StartCount />
          <ResultBoard />
        </Layout>
      </GameProvider>
    </TimerProvider>
  );
};

export default Home;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const StyledGameInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
`;
