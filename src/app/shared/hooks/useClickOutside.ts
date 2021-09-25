import { MutableRefObject, useEffect, useRef } from 'react';

function useClickOutside<TRef extends HTMLElement>(
  onClickOutside: () => void,
): MutableRefObject<TRef> {
  const callbackRef = useRef<() => void>();
  const containerRef = useRef<TRef>(null);

  useEffect(() => {
    callbackRef.current = onClickOutside;
  });

  useEffect(() => {
    const containerElt = containerRef.current;
    const callback = callbackRef.current;

    function handleClickEvent(event: MouseEvent) {
      if (containerElt && callback && !containerElt.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener('click', handleClickEvent);
    return () => {
      document.removeEventListener('click', handleClickEvent);
    };
  }, []);

  return containerRef;
}

export default useClickOutside;
