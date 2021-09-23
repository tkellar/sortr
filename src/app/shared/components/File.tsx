import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Draggable from '../mixins/Draggable';
import { FileViewModel } from '../models';
import useThemeContext from '../context/useThemeContext';

const FileWrapper = styled.div`
  height: 110px;
  width: 85px;
  box-shadow: 0 0 10px rgba(0,0,0,0.35);
  display: flex;
  align-items: end;
  justify-content: end;
  border: solid ${props => props.color} 1px;
  border-radius: 0.25em;
  color: ${(props) => props.color};
  background: linear-gradient(180deg, ${(props) => props.color} 0%, rgba(237, 49, 93, 0.1) 75%);
`;

function File({ file }: { file: FileViewModel }): JSX.Element {
  const { extension, x, y, name } = file;
  const theme = useThemeContext();
  const getTextColor = (ext: string) => {
    switch (ext?.toLowerCase()) {
      case 'doc':
      case 'docx':
        return theme.colors.blue;
      case 'pdf':
        return theme.colors.pink;
      case 'csv':
      case 'xls':
      case 'xlsx':
        return theme.colors.green;
      case 'ppt':
      case 'pptx':
        return theme.colors.yellow;
      default:
        return theme.colors.grey700;
    }
  };

  return (
    <Draggable initialPosition={{ x, y }}>
      <div className="d-flex flex-column align-items-center">
        <FileWrapper color={getTextColor(extension)}>
          <span className="m-0 p-2 h3">{extension}</span>
        </FileWrapper>
        <div className="text-center">
          {name}
        </div>
      </div>
    </Draggable>
  );
}

File.propTypes = {
  file: PropTypes.shape({
    extension: PropTypes.string,
    xPos: PropTypes.number,
    yPos: PropTypes.number,
  }).isRequired,
};

export default File;
