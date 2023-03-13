import {useEffect, useState} from "react";
import styled from "styled-components";
import {NextPage} from "next";
import {useRouter} from "next/router";
import HowToPlay from "@/components/HowToPlay";
import Layout from "@/components/Layout";
import Logo from "@/components/Logo";
import NameChecker from "@/components/NameChecker";
import {useUser} from "@/contexts/UserContext";
import {RENDER} from "@/styles/theme";

const Home: NextPage = () => {
  const {handleNameInit, name} = useUser();
  const [isOpenName, setIsOpenName] = useState<boolean>(false);
  const [isOpenHowToPlay, setIsOpenHowToPlay] = useState<boolean>(false);

  const router = useRouter();

  const onClickStart = () => {
    if (name === "") setIsOpenName((props) => !props);
  };

  const onClickRanking = () => {
    router.push("/ranking");
  };

  const onClickHowToPlay = () => {
    setIsOpenHowToPlay((props) => !props);
  };

  useEffect(() => {
    handleNameInit();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout seoTitle="Home">
      <StyledContainer>
        <Logo />
        <StyledMenu>
          <StyledNav onClick={onClickStart}>Game Start</StyledNav>
          <StyledNav onClick={onClickRanking}>Ranking</StyledNav>
          <StyledNav onClick={onClickHowToPlay}>How To Play</StyledNav>
        </StyledMenu>
      </StyledContainer>

      {isOpenName && <NameChecker setIsOpen={setIsOpenName} />}
      {isOpenHowToPlay && <HowToPlay setIsOpen={setIsOpenHowToPlay} />}
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
  font-family: "Russo One", sans-serif;

  color: white;
  text-shadow: 2px 4px 10px rgba(48, 57, 121, 0.69);
  font-size: 2rem;

  width: 70%;
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
