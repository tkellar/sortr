import { useEffect, useState } from 'react';
import { BoardViewModel } from '../models';
import useFetch from './useFetch';

interface IUseBoardsReturn {
  boards: BoardViewModel[];
  isLoading: boolean;
  error: Error;
  addBoard: (b: BoardViewModel) => void;
  removeBoard: (id: number) => void;
}

const API_PATH = 'http://localhost:8000/boards';

function useBoards(): IUseBoardsReturn {
  const { isLoading, data, error } = useFetch<BoardViewModel[], Error>(API_PATH, {
    method: 'GET',
  });
  const [boards, setBoards] = useState<BoardViewModel[]>(null);

  function addBoard(newBoard: BoardViewModel): void {
    setBoards((prevState) => prevState.concat(newBoard));
  }

  function removeBoard(boardId: number): void {
    setBoards((prevState) => prevState.filter((board) => board.id !== boardId));
  }

  useEffect(() => {
    setBoards(data);
  }, [data]);

  return {
    boards,
    isLoading,
    error,
    addBoard,
    removeBoard,
  };
}

export default useBoards;
