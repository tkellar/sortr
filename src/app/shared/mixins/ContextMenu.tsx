import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useViewportContext from '../context/useViewportRef';
import useClickOutside from '../hooks/useClickOutside';
import { ContextMenuViewModel, ICoordinates } from '../models';

const ContextMenuWrapper = styled.div`
  display: none;
  position: absolute;
  background-color: ${props => props.theme.colors.grey300};
  border: solid ${props => props.theme.colors.grey400} 1px;
  border-radius: 0.25rem;
  box-shadow: 0 0 10px rbga(0,0,0,0.25);
  z-index: 100;

  &.show {
    display: block;
  }
`;

const ContextMenuItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;

  &:hover {
    background-color: ${props => props.theme.colors.grey400};
    cursor: pointer;
  }

  &:active {
    background-color: ${props => props.theme.colors.grey300};
  }

  &:not(:last-child) {
    border-bottom: solid ${props => props.theme.colors.grey400} 1px;
  }
`;

function ContextMenu({ menu }: { menu: ContextMenuViewModel }): JSX.Element {
  const [show, setShowing] = useState(false);
  const [menuPos, setMenuPos] = useState<ICoordinates>({ x: 0, y: 0 });
  const { allowContextMenu, menuItems } = menu;
  const viewportRef = useViewportContext();
  const contextMenuRef = useClickOutside<HTMLDivElement>(() => {
    setShowing(false);
  });

  useEffect(() => {
    function showContextMenu(event: MouseEvent) {
      event.preventDefault();
      event.stopPropagation();

      setShowing(true);
      setMenuPos({ x: event.offsetX, y: event.offsetY });
    }

    if (allowContextMenu) {
      const viewportElement = viewportRef.current;
      viewportElement.addEventListener('contextmenu', showContextMenu);

      return () => {
        viewportElement.removeEventListener('contextmenu', showContextMenu);
      }
    }
  }, [viewportRef, contextMenuRef, allowContextMenu]);

  function onClickWrapper(event: React.MouseEvent<HTMLDivElement, MouseEvent>, onClickAction: (coords: ICoordinates) => void) {
    event.preventDefault();
    event.stopPropagation();
    setShowing(false);

    if (onClickAction) {
      onClickAction({ x: menuPos.x, y: menuPos.y });
    }
  }

  const { x, y } = menuPos;
  return (
    <ContextMenuWrapper
      className={show ? 'show' : ''}
      style={{ left: x, top: y }}
      onMouseLeave={() => setShowing(false)}
      onBlur={() => setShowing(false)}
      ref={contextMenuRef}
    >
      {menuItems.map((item, i) => (
        <ContextMenuItemWrapper key={i} onClick={(event) => onClickWrapper(event, item.onClickAction)}>
          {item.iconLeft && <FontAwesomeIcon className="me-1" icon={item.iconLeft} />}
          {item.displayText}
          {item.iconRight && <FontAwesomeIcon className="ms-1" icon={item.iconRight} />}
        </ContextMenuItemWrapper>
      ))}
    </ContextMenuWrapper>
  );
}

export default ContextMenu;
