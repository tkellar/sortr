import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import EditableSpan from './EditableSpan';

const BoardContainer = styled.div`
  --height: ${(props) => props.height}px;
  --width: ${(props) => props.width}px;
  position: absolute;
  height: var(--height);
  width: var(--width);
  box-shadow: 0 0 10px 5px #00000066;
  left: calc(50% - var(--width) / 2);
  top: calc(50% - var(--height) / 2);
`;

const BoardHeader = styled.div`
  position: relative;
  top: -2rem;
  display: flex;
  justify-content: space-between;
`;

const Board = () => {
  const [widthState, setWidthState] = useState({ value: 800, valid: true });
  const [heightState, setHeightState] = useState({ value: 600, valid: true });

  function validateDimension(dimension) {
    if (dimension <= 0) {
      return false;
    }

    return true;
  }

  function updateBoardWidth(width) {
    if (validateDimension(width)) {
      setWidthState({
        value: width,
        valid: true,
      });
    } else {
      setWidthState((prevState) => ({
        ...prevState,
        valid: false,
      }));
    }
  }

  function updateBoardHeight(height) {
    if (validateDimension(height)) {
      setHeightState({
        value: height,
        valid: true,
      });
    } else {
      setHeightState((prevState) => ({
        ...prevState,
        valid: false,
      }));
    }
  }

  return (
    <BoardContainer height={heightState.value} width={widthState.value}>
      <BoardHeader className="text-muted">
        <div>
          <EditableSpan>Board 1</EditableSpan>
        </div>
        <div>
          <EditableSpan
            className={widthState.valid ? '' : 'invalid'}
            onBlur={(event) => updateBoardWidth(event.target.innerText)}
          >
            {widthState.value}
          </EditableSpan>
          <FontAwesomeIcon className="mx-1" icon={faTimes} />
          <EditableSpan
            className={heightState.valid ? '' : 'invalid'}
            onBlur={(event) => updateBoardHeight(event.target.innerText)}
          >
            {heightState.value}
          </EditableSpan>
        </div>
      </BoardHeader>
    </BoardContainer>
  );
};

export default Board;
