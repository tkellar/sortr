import { useEffect, useState } from 'react';
import { BoardItemType, IFile } from '../models';
import useFetch from './useFetch';

interface IUseFilesReturn {
  files: IFile[];
  isLoading: boolean;
  error: Record<string, unknown>;
  addFile: (f: IFile) => void;
  removeFile: (id: number) => void;
}

function useFiles(parentBoardItemType: BoardItemType, parentId: number): IUseFilesReturn {
  let apiPath = 'http://localhost:8000/boardItems';
  apiPath += `?parentBoardItemType=${parentBoardItemType}`;
  apiPath += `&parentId=${parentId}`;
  const { isLoading, data, error } = useFetch<IFile[], Record<string, unknown>>(apiPath, {
    method: 'GET',
  });

  const [files, setFiles] = useState<IFile[]>(null);

  function addFile(newFile: IFile): void {
    setFiles((prevState) => prevState.concat(newFile));
  }

  function removeFile(fileId: number): void {
    setFiles((prevState) => prevState.filter((file) => file.id !== fileId));
  }

  useEffect(() => {
    setFiles(data);
  }, [data]);

  return {
    files,
    isLoading,
    error,
    addFile,
    removeFile,
  };
}

export default useFiles;
