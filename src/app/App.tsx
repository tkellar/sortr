import { useRef, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Header from './components/Header';
import { ViewportProvider } from './context/useViewportRef';
import DrawerMenu from './components/DrawerMenu';
import { BoardViewModel, ContextMenuItem, ContextMenuViewModel, ICoordinates, IHeightWidth, UserItemType } from './models';
import ContextMenu from './components/ContextMenu';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import usePage from './hooks/usePage';
import UserItemFactory from './components/UserItemFactory';
import BoardForm from './components/forms/BoardForm';

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
  const { page, addChild } = usePage(1);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [newBoardPosition, setNewBoardPosition] = useState<ICoordinates>(null);

  const menuItems: ContextMenuItem[] = [
    { displayText: 'New Board', iconLeft: faPlusCircle, onClickAction: onNewBoardClick },
    { displayText: 'Customize...' }
  ];

  function onNewBoardClick(coords: ICoordinates) {
    console.log(coords);
    setNewBoardPosition(coords);
  }

  function onNewBoardSubmit(formValue: { name: string; width: number; height: number }): void {
    const { x, y } = newBoardPosition;
    const newBoard: BoardViewModel = {
      name: formValue.name,
      height: formValue.height,
      width: formValue.width,
      userItemType: UserItemType.Board,
      childUserItemIds: [],
      x,
      y,
    };

    fetch(`http://localhost:8000/userItems`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBoard),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error();
    }).then((created: BoardViewModel) => {
      addChild(created.id);
      setNewBoardPosition(null);
    })
  }

  return (
    <div className="App">
      <ThemeProvider theme={initialTheme}>
        <Header />
        <DrawerMenu />
          <Viewport height={4000} width={4000} ref={viewportRef}>
            <ViewportProvider value={viewportRef}>
              <BoardForm onSubmitCallback={onNewBoardSubmit} showAt={newBoardPosition} />
              <ContextMenu menu={new ContextMenuViewModel(menuItems)} />
              {page?.childUserItemIds?.map((childId) => (
                <UserItemFactory key={childId} userItemId={childId} />
              ))}
            </ViewportProvider>
          </Viewport>
      </ThemeProvider>
    </div>
  );
}

export default App;
