import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';
import useContextMenuContext from '../context/ContextMenuContext';
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
  if (!menu) {
    return null;
  }

  const { menuItems, position } = menu;
  const [shownChildMenu, setShownChildMenu] = useState<number>(null);
  const context = useContextMenuContext();
  const contextMenuRef = useClickOutside<HTMLDivElement>(() => {
    context.setMenuConfig(null);
  });

  function onClickWrapper(event: React.MouseEvent<HTMLDivElement, MouseEvent>, onClickAction: (coords: ICoordinates) => void) {
    event.preventDefault();
    event.stopPropagation();

    if (onClickAction) {
      onClickAction({ x: position.x, y: position.y });
    }
  }

  return (
    <ContextMenuWrapper
      className={position ? 'show' : ''}
      style={{ left: position?.x, top: position?.y }}
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
              className={shownChildMenu === i ? 'show' : ''}
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
