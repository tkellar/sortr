import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

const EditableSpan = (props) => {
  const { children, onBlur, className } = props;

  return (
    <Span className={className} onBlur={onBlur} contentEditable suppressContentEditableWarning>
      {children}
    </Span>
  );
};

EditableSpan.propTypes = {
  children: PropTypes.node,
  onBlur: PropTypes.func,
  className: PropTypes.string,
};

EditableSpan.defaultProps = {
  children: null,
  onBlur: null,
  className: '',
};

export default EditableSpan;
