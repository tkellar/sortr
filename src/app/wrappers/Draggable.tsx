import React, { useState, useEffect, useRef, PropsWithChildren, SyntheticEvent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useBoundingContainerContext from '../context/BoundingContainerContext';
import { ICoordinates } from '../models';
import { getMouseOffset } from '../helpers/getMouseOffset';

const DraggableContainer = styled.div`
  position: absolute;

  &:hover {
    cursor: pointer;
  }

  &.dragging {
    &:hover {
      cursor: grab;

      &:active {
        cursor: grabbing;
      }
    }
  }
`;

function Draggable({ children, allowDrag, initialPosition }: PropsWithChildren<{initialPosition: ICoordinates, allowDrag: boolean}>): JSX.Element {
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState<ICoordinates>({
    x: initialPosition?.x ?? 0,
    y: initialPosition?.y ?? 0,
  });

  const [mouseGrabPos, setMouseGrabPos] = useState<ICoordinates>({
    x: 0,
    y: 0,
  });

  const viewportRef = useBoundingContainerContext();
  const draggableRef = useRef<HTMLDivElement>(null);
  const allowDragRef = useRef(allowDrag && dragging);
  const mouseGrabPosRef = useRef(mouseGrabPos);

  useEffect(() => {
    allowDragRef.current = allowDrag && dragging;
  }, [allowDrag, dragging]);

  useEffect(() => {
    mouseGrabPosRef.current = mouseGrabPos;
  }, [mouseGrabPos]);

  useEffect(() => {
    const elt = viewportRef.current;

    elt.addEventListener('mousemove', onMouseMove);
    return () => {
      elt.removeEventListener('mousemove', onMouseMove);
    };

    function onMouseMove(event: MouseEvent) {
      if (allowDragRef.current) {
        const { x, y } = getMouseOffset(event, elt);

        setPosition(() => {
          const newState = {
            x: Math.max(0, x - mouseGrabPosRef.current.x),
            y: Math.max(0, y - mouseGrabPosRef.current.y),
          };

          const viewportWidth = viewportRef.current.clientWidth;
          const draggableWidth = draggableRef.current.clientWidth;
          newState.x = Math.min(viewportWidth - draggableWidth, newState.x);

          const viewportHeight = viewportRef.current.clientHeight;
          const draggableHeight = draggableRef.current.clientHeight;
          newState.y = Math.min(viewportHeight - draggableHeight, newState.y);

          return newState;
        });
      }
    }
  }, []);

  function onMouseDown(event: SyntheticEvent<HTMLElement, MouseEvent>): void {
    event.preventDefault();
    event.stopPropagation();

    setDragging(true);
    setMouseGrabPos(getMouseOffset(event.nativeEvent, event.target as HTMLElement));
  }

  return (
    <DraggableContainer
      className={allowDrag ? 'dragging' : ''}
      onMouseDown={onMouseDown}
      onMouseUp={() => setDragging(false)}
      style={{ left: position.x, top: position.y }}
      ref={draggableRef}
    >
      {children}
    </DraggableContainer>
  );
}

Draggable.propTypes = {
  initialPosition: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

Draggable.defaultProps = {
  initialPosition: null,
};

export default Draggable;
