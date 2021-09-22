import React, { useRef } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Board from './shared/components/Board';
import Header from './menu-items/Header';
import { ViewportProvider } from './shared/context/useViewportRef';
import DrawerMenu from './menu-items/DrawerMenu';
import { IHeightWidth } from './shared/models';
import useBoards from './shared/hooks/useBoards';

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
  shadows: {
    createShadow: (d, b, s) => {
      function getDirection(dir) {
        switch (dir) {
          case 'up':
            return '0 -1px';
          case 'down':
            return '0 1px';
          case 'right':
            return '1px 0';
          case 'left':
            return '-1px 0';
          default:
            return '0 0';
        }
      }
      return `${getDirection(d)} ${b ?? '4px'} ${s ?? '0'} rgba(0,0,0,0.25)`;
    },
  },
  zIndex: {
    header: 100,
    drawerMenu: 50,
  },
  sizing: {
    menuHeight: 60,
  },
};

const Viewport = styled.div<IHeightWidth>`
  position: relative;
  top: ${(props) => props.theme.sizing.menuHeight}px;
  left: ${(props) => props.theme.sizing.menuHeight}px;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  background-color: ${(props) => props.theme.colors.grey200};
  overflow: scroll;
`;

function App(): JSX.Element {
  const { boards } = useBoards();
  const viewportRef = useRef<HTMLDivElement>(null);

  return (
    <div className="App">
      <ThemeProvider theme={initialTheme}>
        <Header />
        <DrawerMenu />
        <Viewport height={4000} width={4000} ref={viewportRef}>
          <ViewportProvider value={viewportRef}>
            {boards?.map((board) => (
              <Board key={board.id} board={board} />
            ))}
          </ViewportProvider>
        </Viewport>
      </ThemeProvider>
    </div>
  );
}

export default App;
