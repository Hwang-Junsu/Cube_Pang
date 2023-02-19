import Layout from "@/components/Layout";
import { RENDER } from "@/styles/theme";
import { NextPage } from "next";
import Link from "next/link";
import styled from "styled-components";

const Home: NextPage = () => {
  return (
    <Layout seoTitle="Home">
      <StyledContainer>
        <StyledTitle>Cube Pang</StyledTitle>
        <StyledMenu>
          <StyledNav>
            <Link href="/">Game Start</Link>
          </StyledNav>
          <StyledNav>Ranking</StyledNav>
          <StyledNav>Log Out</StyledNav>
        </StyledMenu>
      </StyledContainer>
    </Layout>
  );
};

export default Home;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 400px;
  gap: 30px;
`;

const StyledTitle = styled.div`
  height: 100px;
  border-radius: 15px;

  width: 100%;

  font-size: 3rem;
  color: white;
  text-shadow: 2px 4px 10px rgba(48, 57, 121, 0.69);

  display: flex;
  justify-content: center;
  align-items: center;

  user-select: none;

  ${RENDER.glassmophism}
`;

const StyledMenu = styled.div`
  width: 100%;

  padding: 20px 10px;
  gap: 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 15px;

  ${RENDER.glassmophism}
`;

const StyledNav = styled.div`
  text-align: center;

  color: white;
  text-shadow: 2px 4px 10px rgba(48, 57, 121, 0.69);
  font-size: 2rem;

  width: 60%;
  padding: 3px 20px;

  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;

  cursor: pointer;

  box-shadow: ${(props) => props.theme.boxShadow.normal};

  &:hover {
    color: #30cfd0;
    transform: scale(1.05);
    transition: all 0.3s ease-in-out;
  }
`;
