import React from 'react';
import styled from 'styled-components';
import Board from './shared/components/Board';
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

  return (
    <div className="App">
      <Viewport height={4000} width={4000}>
        {data?.map((board) => (
          <Board key={board.id} board={board} />
        ))}
      </Viewport>
    </div>
  );
};

export default App;
