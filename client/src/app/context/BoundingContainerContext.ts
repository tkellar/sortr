import { createContext, MutableRefObject, useContext } from 'react';

export const BoundingContainerContext = createContext(null);

export const BoundingContainerProvider = BoundingContainerContext.Provider;

function useBoundingContainerContext(): MutableRefObject<HTMLElement> {
  return useContext(BoundingContainerContext);
}

export default useBoundingContainerContext;
