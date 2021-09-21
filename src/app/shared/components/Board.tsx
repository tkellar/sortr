import React, { useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import EditableSpan from './EditableSpan';
import Draggable from '../mixins/Draggable';
import useFetch from '../hooks/useFetch';
import File from './File';
import { ViewportProvider } from '../context/useViewportRef';
import { IBoard, IFile, IHeightWidth } from '../models';

const BoardContainer = styled.div<IHeightWidth>`
  position: relative;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  box-shadow: 0 0 10px 5px #00000066;
  background-color: ${(props) => props.theme.colors.grey100};
`;

const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

function validateDimension(dimension) {
  // FIXME: Account for board position and don't hardcode max dimension
  if (dimension <= 0 || dimension > 4000) {
    return false;
  }

  return true;
}

function reducer(state, action) {
  switch (action.type) {
    case 'setWidth':
      return {
        ...state,
        width: action.width,
      };
    case 'setHeight':
      return {
        ...state,
        height: action.height,
      };
    case 'validate':
      if (action.width !== undefined && !validateDimension(action.width)) {
        return {
          ...state,
          valid: false,
          message: 'Invalid Width',
        };
      }

      if (action.height !== undefined && !validateDimension(action.height)) {
        return {
          ...state,
          valid: false,
          message: 'Invalid Height',
        };
      }

      return {
        ...state,
        valid: true,
        message: null,
      };
    default:
      throw new Error('Unknown action');
  }
}

function Board({ board }: { board: IBoard }): JSX.Element {
  const { id, name, height, width, x, y } = board;
  const initialState = {
    height,
    width,
    valid: true,
    message: null,
  };

  const { data } = useFetch<IFile[], Record<string, unknown>>(`http://localhost:8000/files?boardId=${id}`, { method: 'GET' });
  const [state, dispatch] = useReducer(reducer, initialState);
  const viewportRef = useRef(null);

  function updateBoardWidth(newWidth) {
    if (state.valid) {
      dispatch({ type: 'setWidth', width: newWidth });
    }
  }

  function updateBoardHeight(newHeight) {
    if (state.valid) {
      dispatch({ type: 'setHeight', height: newHeight });
    }
  }

  return (
    <Draggable initialPosition={{ x, y }}>
      <BoardHeader className="text-muted mb-1">
        <div>
          <EditableSpan>{name}</EditableSpan>
        </div>
        <div>
          <EditableSpan
            className={state.valid ? '' : 'invalid'}
            onBlur={(event) => updateBoardWidth(event.target.innerText)}
            onInput={(event) => dispatch({ type: 'validate', width: event.target.innerText })}
          >
            {state.width}
          </EditableSpan>
          <FontAwesomeIcon className="mx-1" icon={faTimes} />
          <EditableSpan
            className={state.valid ? '' : 'invalid'}
            onBlur={(event) => updateBoardHeight(event.target.innerText)}
            onInput={(event) => dispatch({ type: 'validate', height: event.target.innerText })}
          >
            {state.height}
          </EditableSpan>
        </div>
      </BoardHeader>
      <BoardContainer height={state.height} width={state.width} ref={viewportRef}>
        <ViewportProvider value={viewportRef}>
          {data?.map((file) => (
            <File key={file.id} file={file} />
          ))}
        </ViewportProvider>
      </BoardContainer>
    </Draggable>
  );
}

Board.propTypes = {
  board: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    xPos: PropTypes.number.isRequired,
    yPos: PropTypes.number.isRequired,
  }).isRequired,
};

export default Board;
