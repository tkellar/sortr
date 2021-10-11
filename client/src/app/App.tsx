// import { useRef } from 'react';
// import styled from 'styled-components';
// import Header from './components/Header';
// import { BoundingContainerProvider } from './context/BoundingContainerContext';
// import DrawerMenu from './components/DrawerMenu';
// import { IHeightWidth } from './models';
// import { ContextMenuProvider } from './context/ContextMenuContext';
// import Page from './components/Page';
import { ThemeProvider } from './context/ThemeContext';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Workspaces from './pages/Workspaces';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';

// const Viewport = styled.div`
//   position: fixed;
//   top: ${(props) => props.theme.sizing.menuHeight}px;
//   left: ${(props) => props.theme.sizing.menuHeight}px;
//   height: calc(100vh - ${(props) => props.theme.sizing.menuHeight}px);
//   width: calc(100vw - ${(props) => props.theme.sizing.menuHeight}px);

//   overflow: scroll;
// `;

// const ViewportContentWrapper = styled.div<IHeightWidth>`
//   position: relative;
//   height: ${(props) => props.height}px;
//   width: ${(props) => props.width}px;
//   background-color: ${props => props.theme.colors.grey200};
// `;

function App(): JSX.Element {
  return (
    <ThemeProvider>
      <Router>
        <Header />

        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/workspaces" component={Workspaces} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
