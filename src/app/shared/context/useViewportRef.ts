import { createContext, MutableRefObject, useContext } from 'react';

export const ViewportContext = createContext(null);

export const ViewportProvider = ViewportContext.Provider;

function useViewportContext(): MutableRefObject<HTMLElement> {
  return useContext(ViewportContext);
}

export default useViewportContext;
