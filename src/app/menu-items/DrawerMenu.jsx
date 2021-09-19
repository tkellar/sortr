import React, { useState } from 'react';
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
  transition: width ease-out 0.5s;

  .rotate-on-expand {
    transition: transform 0.5s ease-out;
    &:hover {
      cursor: pointer;
    }
  }

  &.expanded {
    width: 400px;

    .rotate-on-expand {
      transform: rotate(180deg);
    }
  }
`;

const ButtonColumn = styled.div`
  position: absolute;
  top: ${(props) => props.top}px;
  bottom: 0;
  ${(props) => (props.stickyRight ? 'right' : 'left')}: 0;
  width: ${(props) => props.theme.sizing.menuHeight}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
`;

function DrawerMenu() {
  const [expanded, setExpanded] = useState(false);

  function onExpandToggleClick() {
    setExpanded((prevExpanded) => !prevExpanded);
  }

  return (
    <DrawerMenuContainer className={expanded ? 'expanded' : ''}>
      <ButtonColumn top={0} stickyRight>
        <FontAwesomeIcon
          className="rotate-on-expand"
          icon={faAngleRight}
          size="2x"
          rotation={expanded ? 180 : 0}
          onClick={onExpandToggleClick}
        />
      </ButtonColumn>
      <ButtonColumn top={100}>
        <div className="d-flex flex-column align-items-center justify-content-between">
          <FontAwesomeIcon icon={faSitemap} fixedWidth size="2x" />
          <FontAwesomeIcon icon={faFileMedical} size="2x" fixedWidth className="my-4" />
          <FontAwesomeIcon icon={faFolderPlus} size="2x" fixedWidth className="mb-4" />
          <FontAwesomeIcon icon={faToolbox} size="2x" fixedWidth />
        </div>
        <FontAwesomeIcon icon={faUserCog} size="2x" fixedWidth />
      </ButtonColumn>
    </DrawerMenuContainer>
  );
}

export default DrawerMenu;
