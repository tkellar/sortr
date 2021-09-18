import { createContext, useContext } from 'react';

export const ViewportContext = createContext(null);

export const ViewportProvider = ViewportContext.Provider;

function useViewportContext() {
  return useContext(ViewportContext);
}

export default useViewportContext;
