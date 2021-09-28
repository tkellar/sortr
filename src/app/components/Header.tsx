import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  height: ${(props) => props.theme.sizing.menuHeight}px;
  background-color: ${(props) => props.theme.colors.grey100};
  z-index: ${(props) => props.theme.zIndex.header};
  box-shadow: ${(props) => props.theme.shadows.createShadow('down')};
`;

function Header(): JSX.Element {
  return <HeaderContainer />;
}

export default Header;
