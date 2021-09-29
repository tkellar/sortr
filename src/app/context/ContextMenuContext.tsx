import { createContext, MutableRefObject, PropsWithChildren, useContext, useState } from 'react';
import ContextMenu from '../components/ContextMenu';
import { ContextMenuConfig } from '../models';

export const ContextMenuContext = createContext(null);

export interface IContextMenuContextReturn {
  setMenuConfig: (menuItems: ContextMenuConfig) => void;
  parentViewport: MutableRefObject<HTMLElement>;
}

export function ContextMenuProvider({ children, parentViewport }: PropsWithChildren<{ parentViewport: MutableRefObject<HTMLElement>}>): JSX.Element {
  const [menuConfig, setMenuConfig] = useState<ContextMenuConfig>(null);

  return (
    <ContextMenuContext.Provider
      value={{ setMenuConfig, parentViewport }}
    >
      <ContextMenu menu={menuConfig} />
      {children}
    </ContextMenuContext.Provider>
  );
}

function useContextMenuContext(): IContextMenuContextReturn {
  return useContext(ContextMenuContext);
}

export default useContextMenuContext;
