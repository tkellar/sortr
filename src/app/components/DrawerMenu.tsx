import { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

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

const ButtonColumn = styled.div<{ top: number; stickyRight?: boolean }>`
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

function DrawerMenu(): JSX.Element {
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
          rotation={expanded ? 180 : null}
          onClick={onExpandToggleClick}
        />
      </ButtonColumn>
    </DrawerMenuContainer>
  );
}

export default DrawerMenu;
