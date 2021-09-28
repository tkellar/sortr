import { MutableRefObject, useEffect, useRef } from 'react';
import useContextMenuContext from '../context/ContextMenuContext';
import { getMouseOffset } from '../helpers/getMouseOffset';
import { ContextMenuViewModel } from '../models';

function useContextMenu(
  viewportRef: MutableRefObject<HTMLElement>,
  menuConfig: ContextMenuViewModel,
): void {
  const context = useContextMenuContext();

  const menuConfigRef = useRef(menuConfig);
  const contextRef = useRef(context);

  useEffect(() => {
    menuConfigRef.current = menuConfig;
    contextRef.current = context;
  }, [menuConfig, context]);

  useEffect(() => {
    function showContextMenu(event: MouseEvent) {
      event.preventDefault();
      event.stopPropagation();

      if (menuConfigRef.current.allowContextMenu) {
        const parentViewport = contextRef.current.parentViewport.current;
        const positionInViewport = getMouseOffset(event, parentViewport);

        contextRef.current.setMenuConfig({
          ...menuConfigRef.current,
          position: positionInViewport,
        });
      }
    }
    const viewportElement = viewportRef.current;
    viewportElement.addEventListener('contextmenu', showContextMenu);

    return () => {
      viewportElement.removeEventListener('contextmenu', showContextMenu);
    };
  }, []);
}

export default useContextMenu;
