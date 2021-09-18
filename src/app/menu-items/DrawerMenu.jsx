import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleRight,
  faUserCog,
  faFileMedical,
  faSitemap,
  faFolderPlus,
  faToolbox,
} from '@fortawesome/free-solid-svg-icons';

const DrawerMenuContainer = styled.div`
  position: fixed;
  top: ${(props) => props.theme.sizing.menuHeight}px;
  left: 0;
  bottom: 0;
  width: 60px;
  z-index: ${(props) => props.theme.zIndex.drawerMenu};
  background-color: ${(props) => props.theme.colors.grey100};
  box-shadow: ${(props) => props.theme.shadows.createShadow('right')};
`;

function DrawerMenu() {
  return (
    <DrawerMenuContainer>
      <div className="d-flex flex-column align-items-center justify-content-between py-3 h-100">
        <FontAwesomeIcon icon={faAngleRight} size="2x" />
        <div className="d-flex flex-column align-items-center justify-content-between">
          <FontAwesomeIcon icon={faSitemap} fixedWidth size="2x" />
          <FontAwesomeIcon icon={faFileMedical} size="2x" fixedWidth className="my-4" />
          <FontAwesomeIcon icon={faFolderPlus} size="2x" fixedWidth className="mb-4" />
          <FontAwesomeIcon icon={faToolbox} size="2x" fixedWidth />
        </div>
        <FontAwesomeIcon icon={faUserCog} size="2x" fixedWidth />
      </div>
    </DrawerMenuContainer>
  );
}

export default DrawerMenu;
