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

const File = ({ fileConfig }) => {
  const { extension, xPos, yPos } = fileConfig;
  const getTextColor = (ext) => {
    switch (ext) {
      default:
        return 'red';
    }
  };

  return (
    <Draggable className="File" initialPosition={{ x: xPos, y: yPos }}>
      <FileWrapper color={getTextColor(extension)}>
        <span className="m-0 p-2 h3">{extension}</span>
      </FileWrapper>
    </Draggable>
  );
};

File.propTypes = {
  fileConfig: PropTypes.shape({
    extension: PropTypes.string,
    xPos: PropTypes.number,
    yPos: PropTypes.number,
  }).isRequired,
};

export default File;
