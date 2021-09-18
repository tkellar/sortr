import React, { useRef } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Board from './shared/components/Board';
import { ViewportProvider } from './shared/context/useViewportRef';
import useFetch from './shared/hooks/useFetch';
import './App.css';

const initialTheme = {
  colors: {
    pink: '#ED315D',
    yellow: '#FFC847',
    green: '#05B384',
    blue: '#118AB2',
    darkBlue: '#073B4C',
    danger: '#DC3545',
    grey100: '#f8f9fa',
    grey200: '#e9ecef',
    grey300: '#dee2e6',
    grey400: '#ced4da',
    grey500: '#adb5bd',
    grey600: '#6c757d',
    grey700: '#495057',
    grey800: '#343a40',
    grey900: '#212529',
  },
};

const Viewport = styled.div`
  position: relative;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  background-color: ${(props) => props.theme.colors.grey200};
  overflow: scroll;
`;

const App = () => {
  const { data } = useFetch('http://localhost:8000/boards', { method: 'GET' });
  const viewportRef = useRef(null);

  return (
    <div className="App">
      <ThemeProvider theme={initialTheme}>
        <Viewport height={4000} width={4000} ref={viewportRef}>
          <ViewportProvider value={viewportRef}>
            {data?.map((board) => (
              <Board key={board.id} board={board} />
            ))}
          </ViewportProvider>
        </Viewport>
      </ThemeProvider>
    </div>
  );
};

export default App;
