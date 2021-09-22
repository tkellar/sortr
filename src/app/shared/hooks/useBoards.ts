import { useEffect, useState } from 'react';
import { IBoard } from '../models';
import useFetch from './useFetch';

interface IUseBoardsReturn {
  boards: IBoard[];
  isLoading: boolean;
  error: Record<string, unknown>;
  addBoard: (b: IBoard) => void;
  removeBoard: (id: number) => void;
}

const API_PATH = 'http://localhost:8000/boards';

function useBoards(): IUseBoardsReturn {
  const { isLoading, data, error } = useFetch<IBoard[], Record<string, unknown>>(API_PATH, {
    method: 'GET',
  });
  const [boards, setBoards] = useState<IBoard[]>(null);

  function addBoard(newBoard: IBoard): void {
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
