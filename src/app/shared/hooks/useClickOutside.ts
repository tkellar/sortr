import { MutableRefObject, useEffect } from 'react';

function useClickOutside(onClickOutside: () => void, ref: MutableRefObject<HTMLDivElement>): void {
  useEffect(() => {
    function handleClickEvent(event: MouseEvent) {
      if (!ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    }

    if (ref) {
      document.addEventListener('click', handleClickEvent);
      return () => {
        document.removeEventListener('click', handleClickEvent);
      };
    }
  }, [ref, onClickOutside]);
}

export default useClickOutside;
