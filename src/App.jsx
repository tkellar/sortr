import React, { useRef } from 'react';
import styled from 'styled-components';
import Board from './shared/components/Board';
import { ViewportProvider } from './shared/context/useViewportRef';
import useFetch from './shared/hooks/useFetch';
import './App.css';

const Viewport = styled.div`
  position: relative;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  overflow: scroll;
`;

const App = () => {
  const { data } = useFetch('http://localhost:8000/boards', { method: 'GET' });
  const viewportRef = useRef(null);

  return (
    <div className="App">
      <Viewport height={4000} width={4000} ref={viewportRef}>
        <ViewportProvider value={viewportRef}>
          {data?.map((board) => (
            <Board key={board.id} board={board} />
          ))}
        </ViewportProvider>
      </Viewport>
    </div>
  );
};

export default App;
