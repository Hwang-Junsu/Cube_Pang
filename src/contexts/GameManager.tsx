import {
  BLOCK_COLORS,
  BOARD_SIZE,
  COLORS,
  COLORS_LENGTH,
} from "@/constants/constants";
import {
  analyzeBoard,
  hasDestroyedBlock,
  isPossilbeMove,
} from "@/libs/client/gameLogic";
import {
  ConvertParameter,
  FetchRecordParameter,
  IBlockColor,
  IBlockColorWithIndex,
  IBlockIndex,
  IGameManagerProps,
  SwapParameter,
} from "@/types/logic";
import {Nullable, Props} from "@/types/types";
import {createContext, useCallback, useEffect, useState} from "react";

const initialProps: IGameManagerProps = {
  board: [[]],
  firstChoice: null,
  secondChoice: null,
  onSelect: () => {},
  score: 0,
  handleGameStart: () => {},
  handleGameInit: () => {},
  handleFetchRecord: () => new Promise((resolve) => resolve),
  isGamePlay: false,
};

const GameManager = createContext(initialProps);

const GameProvider = ({children}: Props) => {
  const [board, setBoard] = useState<IBlockColor[][]>(
    Array.from({length: BOARD_SIZE}, () =>
      Array.from({length: BOARD_SIZE}, (_, idx) => {
        const randomNum = Math.floor(Math.random() * COLORS_LENGTH);
        return {
          color: BLOCK_COLORS[COLORS[randomNum]],
          value: COLORS[randomNum],
          index: idx,
        };
      })
    )
  );
  const [firstChoice, setFirstChoice] = useState<Nullable<IBlockIndex>>(null);
  const [secondChoice, setSecondChoice] = useState<Nullable<IBlockIndex>>(null);
  const [isBreakTime, setIsBreakTime] = useState<boolean>(false);
  const [isHandleSwap, setIsHandleSwap] = useState<boolean>(false);
  const [isGamePlay, setIsGamePlay] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const onSelect = (cx: number, cy: number) => {
    if (isBreakTime) return;
    if (!firstChoice) {
      setFirstChoice({x: cx, y: cy});
    } else {
      setSecondChoice({x: cx, y: cy});
    }
  };

  const handleFetchRecord: FetchRecordParameter = useCallback(
    async (name, score) => {
      await fetch("/api/ranking", {
        method: "POST",
        body: JSON.stringify({name, score}),
      });
    },
    []
  );

  const handleGameInit = useCallback(() => {
    setFirstChoice(null);
    setSecondChoice(null);
    setIsBreakTime(false);
    setIsHandleSwap(false);
    setIsGamePlay(false);
    setScore(0);
    setBoard(
      Array.from({length: BOARD_SIZE}, () =>
        Array.from({length: BOARD_SIZE}, (_, idx) => {
          const randomNum = Math.floor(Math.random() * COLORS_LENGTH);
          return {
            color: BLOCK_COLORS[COLORS[randomNum]],
            value: COLORS[randomNum],
            index: idx,
          };
        })
      )
    );
  }, []);

  const handleGameStart = useCallback(() => {
    setIsGamePlay(true);
  }, []);

  const handleConvert: ConvertParameter = useCallback((blocks) => {
    const destroyBlocks = blocks;
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];

      destroyBlocks.forEach((block) => {
        newBoard[block.x][block.y].value = "broken";
      });

      return newBoard;
    });
    setScore((prev) => prev + destroyBlocks.length * 100);
  }, []);

  const handleBreak = useCallback(() => {
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];

      return newBoard.map((row) =>
        row.filter((block) => block.value !== "broken")
      );
    });
  }, []);

  const handleFillBoard = useCallback(() => {
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];

      for (let row = 0; row < BOARD_SIZE; row++) {
        const rowLength = newBoard[row].length;
        if (rowLength < BOARD_SIZE) {
          for (let i = rowLength; i < BOARD_SIZE; i++) {
            const randomNum = Math.floor(Math.random() * COLORS_LENGTH);
            newBoard[row].push({
              color: BLOCK_COLORS[COLORS[randomNum]],
              value: COLORS[randomNum],
              index: BOARD_SIZE - i,
            });
          }
        }
      }

      return newBoard;
    });
  }, []);

  const handleSwap: SwapParameter = useCallback(
    (first, second) => {
      if (!isPossilbeMove(first, second)) return;

      const toBeDestroyed = hasDestroyedBlock(board, first, second);
      if (!toBeDestroyed.length) return;

      const saveFirst = board[first!.x][first!.y];
      const saveSecond = board[second!.x][second!.y];
      setBoard((prevBoard: IBlockColor[][]) => {
        const newBoard = [...prevBoard];
        newBoard[first!.x][first!.y] = saveSecond;
        newBoard[second!.x][second!.y] = saveFirst;

        return newBoard;
      });
      setTimeout(() => {
        handleConvert(toBeDestroyed);
      }, 100);
      setTimeout(() => {
        handleBreak();
      }, 700);
      setTimeout(() => {
        handleFillBoard();
      }, 800);
      setTimeout(() => {
        setIsHandleSwap(true);
      }, 900);
    },
    [board, handleBreak, handleConvert, handleFillBoard]
  );

  useEffect(() => {
    handleGameInit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (firstChoice && secondChoice) {
      handleSwap(
        {...firstChoice, value: board[firstChoice.x][firstChoice.y].value},
        {...secondChoice, value: board[secondChoice.x][secondChoice.y].value}
      );
      setFirstChoice(null);
      setSecondChoice(null);
    }
  }, [board, firstChoice, handleSwap, setSecondChoice, secondChoice]);

  useEffect(() => {
    if (isGamePlay) {
      setIsHandleSwap(false);
      const blocks = analyzeBoard(board);
      if (blocks.length > 0) {
        setIsBreakTime(true);
        setTimeout(() => {
          handleConvert(blocks);
        }, 100);
        setTimeout(() => {
          if (isBreakTime) {
            handleBreak();
            setTimeout(() => {
              handleFillBoard();
              setIsBreakTime(false);
            }, 200);
          }
        }, 700);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isGamePlay,
    isBreakTime,
    isHandleSwap,
    handleBreak,
    handleConvert,
    handleFillBoard,
  ]);

  return (
    <GameManager.Provider
      value={{
        board,
        firstChoice,
        secondChoice,
        onSelect,
        score,
        handleGameStart,
        handleGameInit,
        handleFetchRecord,
        isGamePlay,
      }}
    >
      {children}
    </GameManager.Provider>
  );
};

export {GameManager, GameProvider};
