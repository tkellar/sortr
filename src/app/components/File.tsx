import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Draggable from '../wrappers/Draggable';
import { FileViewModel } from '../models';
import useThemeContext from '../context/ThemeContext';
import useClickOutside from '../hooks/useClickOutside';

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
  background: linear-gradient(180deg, ${(props) => props.color} 0%, ${props => props.theme.colors.grey200} 60%);
  transition: box-shadow 0.2s ease-out;

  &.selected {
    box-shadow: 0 0 8px 4px ${props => props.theme.colors.blue};
  }
`;

function File({ file }: { file: FileViewModel }): JSX.Element {
  const { extension, x, y, name } = file;
  const theme = useThemeContext();
  const [selected, setSelected] = useState(false);
  const fileRef = useClickOutside<HTMLDivElement>(() => setSelected(false));

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

  function onFileClick(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    setSelected(true);
  }

  return (
    <Draggable allowDrag={selected} initialPosition={{ x, y }}>
      <div className="d-flex flex-column align-items-center">
        <FileWrapper
          className={selected ? 'selected' : ''}
          color={getTextColor(extension)}
          onClick={onFileClick}
          ref={fileRef}
        >
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
