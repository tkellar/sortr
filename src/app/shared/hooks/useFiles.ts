import { useEffect, useState } from 'react';
import { BoardItemType, FileViewModel } from '../models';
import useFetch from './useFetch';

interface IUseFilesReturn {
  files: FileViewModel[];
  isLoading: boolean;
  error: Error;
  addFile: (f: FileViewModel) => void;
  removeFile: (id: number) => void;
}

function useFiles(parentBoardItemType: BoardItemType, parentId: number): IUseFilesReturn {
  let apiPath = 'http://localhost:8000/boardItems';
  apiPath += `?parentBoardItemType=${parentBoardItemType}`;
  apiPath += `&parentId=${parentId}`;
  const { isLoading, data, error } = useFetch<FileViewModel[], Error>(apiPath, {
    method: 'GET',
  });

  const [files, setFiles] = useState<FileViewModel[]>(null);

  function addFile(newFile: FileViewModel): void {
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
