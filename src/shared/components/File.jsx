import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Draggable from '../mixins/Draggable';

const FileWrapper = styled.div`
  height: 110px;
  width: 85px;
  box-shadow: 0 0 10px 5px #00000066;
  display: flex;
  align-items: end;
  justify-content: end;
  color: ${(props) => props.color};
`;

const File = ({ extension }) => {
  const getTextColor = (ext) => {
    switch (ext) {
      default:
        return 'red';
    }
  };

  return (
    <Draggable className="File">
      <FileWrapper color={getTextColor(extension)}>
        <span className="m-0 p-2 h3">{extension}</span>
      </FileWrapper>
    </Draggable>
  );
};

File.propTypes = {
  extension: PropTypes.string.isRequired,
};

export default File;
