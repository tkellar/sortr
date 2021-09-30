import { useRef } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Header from './components/Header';
import { BoundingContainerProvider } from './context/BoundingContainerContext';
import DrawerMenu from './components/DrawerMenu';
import { IHeightWidth } from './models';
import { ContextMenuProvider } from './context/ContextMenuContext';
import Page from './components/Page';

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

const Viewport = styled.div`
  position: fixed;
  top: ${(props) => props.theme.sizing.menuHeight}px;
  left: ${(props) => props.theme.sizing.menuHeight}px;
  height: calc(100vh - ${(props) => props.theme.sizing.menuHeight}px);
  width: calc(100vw - ${(props) => props.theme.sizing.menuHeight}px);

  overflow: scroll;
`;

const ViewportContentWrapper = styled.div<IHeightWidth>`
  position: relative;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  background-color: ${props => props.theme.colors.grey200};
`;

function App(): JSX.Element {
  const viewportRef = useRef<HTMLDivElement>(null);

  return (
    <div className="App">
      <ThemeProvider theme={initialTheme}>
        <Header />
        <DrawerMenu />
        <Viewport>
          <ViewportContentWrapper height={4000} width={4000} ref={viewportRef}>
            <ContextMenuProvider parentViewport={viewportRef}>
              <BoundingContainerProvider value={viewportRef}>
                <Page pageId={0} />
              </BoundingContainerProvider>
            </ContextMenuProvider>
          </ViewportContentWrapper>
        </Viewport>
      </ThemeProvider>
    </div>
  );
}

export default App;
