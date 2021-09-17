import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DraggableContainer = styled.div`
  &:hover {
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }
`;

const Draggable = ({ children, initialPosition }) => {
  const [position, setPosition] = useState({
    x: initialPosition?.x ?? 0,
    y: initialPosition?.y ?? 0,
  });

  const [mouseOffset, setMouseOffset] = useState({
    x: 0,
    y: 0,
  });

  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const onMouseMove = (event) => {
      event.preventDefault();
      const { x, y } = event;

      if (dragging) {
        setPosition({
          x: Math.max(0, x) + mouseOffset.x,
          y: Math.max(0, y) + mouseOffset.y,
        });
      }
    };

    const onMouseUp = (event) => {
      event.preventDefault();

      setDragging(false);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragging]); // FIXME: This may cause too many re-renders

  const onMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setDragging(true);
    setMouseOffset({
      x: position.x - event.pageX,
      y: position.y - event.pageY,
    });
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <DraggableContainer className="Draggable" onMouseDown={onMouseDown}>
      <div style={{ position: 'absolute', left: position.x, top: position.y }}>{children}</div>
    </DraggableContainer>
  );
};

Draggable.propTypes = {
  initialPosition: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

Draggable.defaultProps = {
  initialPosition: null,
};

export default Draggable;
