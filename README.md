# Cube Pang

## Description

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcXZd2H%2Fbtr7TlhSXQQ%2FmOvUqsFHDc5Rate3H04UOk%2Fimg.png">

큐브팡은 연속으로 3개 이상의 블록을 만들고 파괴하여 점수를 얻는 5x5 퍼즐 게임입니다.  
플레이하면서 다른 플레이어들과 경쟁하고 순위표에 닉네임을 올려보세요!

## Deploy

> ## **[Game Start](https://cube-pang.vercel.app/home)**

</br>

## How to Play

- 이동하고자 하는 큐브를 클릭하고, 상하좌우 한칸 이내에 있는 큐브를 클릭
- 같은 큐브가 상하좌우로 세개씩 연속되면 점수를 획득 (큐브 1개당 100점)
- 이동 시 큐브 제거가 되지않으면 움직이지 않음

</br>

## Installation

`npm install`

`npm run dev`

</br>

## Main Feature

- Game Logic

  - `analyzePuzzleBlock` 함수를 통해 블록 인덱스를 기준으로 보드에서 파괴될 위치를 계산하고, `hasDestroyedBlock` 함수를 통해 두 블록을 교환할 경우 파괴될 블록들의 위치를 계산합니다.
  - `analyzeBoard` 함수는 보드 전체를 검사하여 파괴될 블록의 위치를 계산합니다. 플레이어의 클릭에 직접적으로 영향을 받지 않는 게임 시작 때 혹은 블록이 파괴된 후를 계산할 때 사용합니다.
  - `isPossibleMove` 함수를 통해 두 블록이 서로 이동가능한지 판단하며, `isSequencialWithData` 함수로 블록의 연속성을 판단합니다.

- GameContext

  - Game Manager 역할을 담당하며, 전체적인 게임 흐름을 담당합니다.
  - 게임 시작시 블록과 점수를 초기화하고, 플레이어가 블록을 움직일 수 있는 로직을 사용합니다.
  - 블록이 깨지는 시간을 고려하기 위해 setTimeout 함수를 활용하였습니다.
  - 2차원 배열의 정보에 대해 불변성이 유지하면서, 코드의 가독성과 유지보수성을 위해 immer 라이브러리를 사용하였습니다.
  - score를 계산하고 랭킹보드에 post 요청을 할 수 있도록 하였습니다.

- TimerContext

  - 게임 타이머와 시작 시 카운트 다운을 담당합니다.
  - setInterval을 활용하여 타이머를 구현하였습니다.
  - 게임의 렌더링과 관계없이 타이머가 렌더링될 수 있도록 GameContext와 분리해 주었습니다.

- Ranking Board
  - PlanetScale과 Prisma를 사용하여 랭킹 정보를 저장해 줄 수 있는 DB를 구축하였습니다.
  - Ranking 관련 API를 구현하였습니다. (GET : 랭킹정보 불러오기, POST : 랭킹 등록하기)
  - SSR을 적용하고자, Next.js의 getServerSideProps메서드를 사용하였습니다.

</br>

## Developer

<table >
<tbody>
<tr>

<td  align="center"><a  href="https://github.com/Hwang-Junsu"><img  src="https://avatars.githubusercontent.com/u/80745897?v=4(https://avatars.githubusercontent.com/u/80745897?v=4)"  width="100px;"  alt=""/><br  /><sub><b>황준수</b></sub></a><br  /></td>

</tbody>
</table>

</br>

## Skill Stack

- Front-end : Typescript, NextJS, styled-components, immer
- Database: PlanetScale
- TypeORM : Prisma
- Deploy : Vercel
