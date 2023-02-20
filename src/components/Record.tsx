import {commaPerThousand} from "@/libs/client/utils";
import {IRecordProps} from "@/types/types";
import React from "react";
import styled from "styled-components";
import {RENDER} from "@/styles/theme";

const Record = ({name, score, ranking}: IRecordProps) => {
  return (
    <StyledRecord>
      <StyledRank>{ranking}</StyledRank>
      <StyledName>{name}</StyledName>
      <StyledScore>{commaPerThousand(score)}</StyledScore>
    </StyledRecord>
  );
};

export default Record;

const StyledRecord = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  width: 100%;
`;

const StyledRank = styled.div`
  font-weight: 600;
  font-size: 20px;
  text-align: center;
  white-space: nowrap;
  color: white;
  font-family: "Russo One", sans-serif;

  ${RENDER.textShadow}
`;

const StyledName = styled.div`
  font-weight: 600;
  font-size: 20px;
  text-align: center;
  white-space: nowrap;
  color: white;
  ${RENDER.textShadow}
`;
const StyledScore = styled.div`
  font-weight: 600;
  font-size: 20px;
  text-align: right;
  white-space: nowrap;
  color: white;
  ${RENDER.textShadow}
  font-family: "Russo One", sans-serif;
`;
