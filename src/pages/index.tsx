import Layout from "@/components/Layout";
import { NextPage } from "next/types";
import styled from "styled-components";
import Board from "@/components/Board";

const Home: NextPage = () => {
  return (
    <Layout seoTitle="Game">
      <StyledContainer>
        <StyledScoreBoard>Score : 0</StyledScoreBoard>
        <Board />
      </StyledContainer>
    </Layout>
  );
};

export default Home;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const StyledScoreBoard = styled.div`
  padding: 10px 20px;
  background: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
  border-radius: 15px;
  box-shadow: ${(props) => props.theme.boxShadow.normal};

  text-align: center;
  font-weight: 600;
`;
