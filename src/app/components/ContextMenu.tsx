import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import useViewportContext from '../context/ViewportContext';
import useClickOutside from '../hooks/useClickOutside';
import { ContextMenuViewModel, ICoordinates } from '../models';

const ContextMenuWrapper = styled.div`
  display: none;
  position: absolute;
  width: max-content;
  background-color: ${props => props.theme.colors.grey300};
  border: solid ${props => props.theme.colors.grey400} 1px;
  border-radius: 0.25rem;
  box-shadow: 0 0 10px rgba(0,0,0,0.25);
  z-index: 100;

  &.show {
    display: block;
  }
`;

const ContextMenuItemWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
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
  const { allowContextMenu, menuItems } = menu;

  const [show, setShowing] = useState(false);
  const [shownChildMenu, setShownChildMenu] = useState<number>(null);
  const [menuPos, setMenuPos] = useState<ICoordinates>({ x: 0, y: 0 });

  const viewportRef = useViewportContext();
  const hideMenuTimeout = useRef<NodeJS.Timeout>(null);
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
  }, [allowContextMenu]);

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
      onMouseLeave={() => { hideMenuTimeout.current = setTimeout(() => setShowing(false), 500); }}
      onMouseEnter={() => { clearTimeout(hideMenuTimeout.current); }}
      ref={contextMenuRef}
    >
      {/* Context Menu Items */}
      {menuItems.map((item, i) => (
        <ContextMenuItemWrapper
          className={item.additionalClasses}
          key={item.displayText}
          onClick={(event) => onClickWrapper(event, item.onClickAction)}
          onMouseEnter={() => setShownChildMenu(i)}
          onMouseLeave={() => setShownChildMenu(null)}
        >
          {item.iconLeft && <FontAwesomeIcon className="me-1" icon={item.iconLeft} />}
          <span className="me-auto">{item.displayText}</span>
          {item.iconRight && <FontAwesomeIcon className="ms-1" icon={item.iconRight} />}

          {item.children &&
            <ContextMenuWrapper
              className={shownChildMenu === i ? 'show ms-1' : ''}
              style={{ left: '100%', top: '0' }}
            >
              {item.children?.map((childItem) => (
                <ContextMenuItemWrapper className={childItem.additionalClasses} key={childItem.displayText} onClick={(event) => onClickWrapper(event, childItem.onClickAction)}>
                  {childItem.iconLeft && <FontAwesomeIcon className="me-1" icon={childItem.iconLeft} />}
                  <span className="me-auto">{childItem.displayText}</span>
                  {childItem.iconRight && <FontAwesomeIcon className="ms-1" icon={childItem.iconRight} />}
                </ContextMenuItemWrapper>
              ))}
            </ContextMenuWrapper>
          }

        </ContextMenuItemWrapper>
      ))}

    </ContextMenuWrapper>
  );
}

export default ContextMenu;
