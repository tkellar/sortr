import React, { useState } from 'react';
import styled from 'styled-components';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ICoordinates } from '../../models';

const BoardFormWrapper = styled.div`
  position: absolute;
  display: none;

  background-color: ${props => props.theme.colors.grey300};
  border: solid ${props => props.theme.colors.grey400} 1px;
  border-radius: 0.25rem;
  box-shadow: 0 0 10px rgba(0,0,0,0.25);
  z-index: 100;

  &.show {
    display: block;
  }
`;

const BoardFormContainer = styled.div`
  padding: 1rem;
  background-color: ${props => props.theme.colors.grey100};

  input[type="number"] {
    max-width: 100px;
  }
`;

function BoardForm({
  onSubmitCallback,
  showAt
}: {
  onSubmitCallback: (formValue: { name: string; width: number; height: number }) => void,
  showAt?: ICoordinates
}): JSX.Element {
  const [name, setName] = useState('Untitled');
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);

  function resetForm() {
    setName('Untitled');
    setWidth(800);
    setHeight(600);
  }

  function onSubmit() {
    onSubmitCallback({
      name,
      width,
      height
    });

    resetForm();
  }

  return (
    <BoardFormWrapper className={showAt ? 'show' : ''} style={{ left: showAt?.x, top: showAt?.y}}>
      <div className="p-2 d-flex align-items-center justify-content-between">
        <h5 className="m-0">New Board</h5>
        <FontAwesomeIcon icon={faTimes} />
      </div>
      <BoardFormContainer>
        <div className="form-group">
          <label className="form-label" htmlFor="boardName">Name</label>
          <input
            type="text"
            id="boardName"
            className="form-control"
            value={name}
            onInput={(event) => setName((event.target as HTMLInputElement).value)}
          />
        </div>
        <div className="mt-2 d-flex align-items-center">
          <div className="form-group me-3">
            <label className="form-label" htmlFor="boardWidth">Width</label>
            <div className="input-group">
              <input
                type="number"
                min={0}
                id="boardWidth"
                className="form-control"
                value={width}
                onInput={(event) => setWidth(+(event.target as HTMLInputElement).value)}
              />
              <span className="input-group-text">
                px
              </span>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="boardHeight">Height</label>
            <div className="input-group">
              <input
                type="number"
                id="boardHeight"
                className="form-control"
                value={height}
                onInput={(event) => setHeight(+(event.target as HTMLInputElement).value)}
              />
              <span className="input-group-text">
                px
              </span>
            </div>
          </div>
        </div>
      </BoardFormContainer>
      <div className="p-2">
        <button onClick={() => onSubmit()} type="button" className="btn btn-primary w-100">
          Add
        </button>
      </div>
    </BoardFormWrapper>
  );
}

export default BoardForm;
