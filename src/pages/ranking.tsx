import React from "react";
import styled from "styled-components";
import Layout from "@/components/Layout";
import Logo from "@/components/Logo";
import Record from "@/components/Record";
import {RENDER} from "@/styles/theme";
import {IRecordResponse} from "@/types/types";
import {Record as RecordProps} from "@prisma/client";

const Ranking = ({data}: IRecordResponse) => {
  return (
    <Layout seoTitle="Ranking">
      <StyledWrapper>
        <Logo />
        <StyledContainer>
          <StyledRecord>
            <StyledRank>Rank</StyledRank>
            <StyledName>Name</StyledName>
            <StyledScore>Score</StyledScore>
          </StyledRecord>
          {data.records.map((record: RecordProps, index: number) => (
            <Record
              key={record.id}
              name={record.name}
              score={record.score}
              ranking={index + 1}
            />
          ))}
        </StyledContainer>
      </StyledWrapper>
    </Layout>
  );
};

export async function getStaticProps() {
  const data = await (
    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/ranking`)
  ).json();
  return {props: {data}};
}

export default Ranking;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 400px;
  gap: 30px;
`;

const StyledContainer = styled.div`
  width: 400px;

  padding: 40px;
  gap: 25px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 15px;

  ${RENDER.glassmophism}
`;

const StyledRecord = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  font-family: "Russo One", sans-serif;
  color: white;
  letter-spacing: 1px;
  ${RENDER.textShadow}
`;
const StyledName = styled.div`
  flex-grow: 3;
  font-weight: 600;
  font-size: 20px;
  text-align: center;
`;
const StyledScore = styled.div`
  flex-grow: 1;
  font-weight: 600;
  font-size: 20px;
  text-align: right;
`;

const StyledRank = styled.div`
  flex-grow: 1;
  font-weight: 600;
  font-size: 20px;
  text-align: left;
`;
