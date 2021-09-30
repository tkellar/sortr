import React, { PropsWithChildren } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

interface IEditableSpanProps {
  onBlur: React.FocusEventHandler<HTMLSpanElement>;
  onInput: React.FocusEventHandler<HTMLSpanElement>;
  className: string;
}

const Span = styled.span`
  padding: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  br {
    display: none;
  }

  * {
    display: inline;
    white-space: nowrap;
  }

  // TODO: Update invalid state styling
  &.invalid {
    color: red;
    border: solid red 2px;
  }
`;

function EditableSpan(props: PropsWithChildren<IEditableSpanProps>): JSX.Element {
  const { children, onBlur, onInput, className } = props;

  return (
    <Span
      className={className}
      onBlur={onBlur}
      onInput={onInput}
      contentEditable
      suppressContentEditableWarning
    >
      {children}
    </Span>
  );
}

EditableSpan.propTypes = {
  children: PropTypes.node,
  onBlur: PropTypes.func,
  onInput: PropTypes.func,
  className: PropTypes.string,
};

EditableSpan.defaultProps = {
  children: null,
  onBlur: null,
  onInput: null,
  className: '',
};

export default EditableSpan;
