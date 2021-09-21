import React, { useState, useEffect, useRef, PropsWithChildren } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useViewportContext from '../context/useViewportRef';
import { ICoordinates } from '../models';

const DraggableContainer = styled.div`
  position: absolute;

  &:hover {
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }
`;

function Draggable({ children, initialPosition }: PropsWithChildren<{initialPosition: ICoordinates}>): JSX.Element {
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({
    x: initialPosition?.x ?? 0,
    y: initialPosition?.y ?? 0,
  });

  const [mouseOffset, setMouseOffset] = useState({
    x: 0,
    y: 0,
  });

  const viewportRef = useViewportContext();
  const draggableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseMove = (event) => {
      const { clientX, clientY } = event;

      if (dragging) {
        setPosition(() => {
          const newState = {
            x: Math.max(0, clientX + mouseOffset.x),
            y: Math.max(0, clientY + mouseOffset.y),
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
    };

    const onDragEnd = (event) => {
      event.preventDefault();

      setDragging(false);
    };

    const elt = viewportRef.current;

    elt.addEventListener('mousemove', onMouseMove);
    elt.addEventListener('mouseup', onDragEnd);
    elt.addEventListener('mouseleave', onDragEnd);
    return () => {
      elt.removeEventListener('mousemove', onMouseMove);
      elt.removeEventListener('mouseup', onDragEnd);
      elt.removeEventListener('mouseleave', onDragEnd);
    };
  }, [dragging, viewportRef, draggableRef]); // FIXME: This may cause too many re-renders

  const onMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setDragging(true);
    setMouseOffset({
      x: position.x - event.nativeEvent.clientX,
      y: position.y - event.nativeEvent.clientY,
    });
  };

  return (
    <DraggableContainer
      className="Draggable"
      onMouseDown={onMouseDown}
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
