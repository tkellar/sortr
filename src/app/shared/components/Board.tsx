import { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Draggable from '../mixins/Draggable';
import File from './File';
import { ViewportProvider } from '../context/useViewportRef';
import { BoardViewModel, ContextMenuItem, ContextMenuViewModel, IHeightWidth } from '../models';
import useFiles from '../hooks/useFiles';
import ContextMenu from '../mixins/ContextMenu';
import { faAngleRight, faPlusCircle, faUpload } from '@fortawesome/free-solid-svg-icons';

const BoardContainer = styled.div<IHeightWidth>`
  position: relative;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  box-shadow: 0 0 10px rgba(0,0,0,0.25);
  background-color: ${(props) => props.theme.colors.grey100};
`;

const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

function Board({ board }: { board: BoardViewModel }): JSX.Element {
  const { id, name, height, width, x, y } = board;

  const { files } = useFiles(0, id);
  const viewportRef = useRef(null);

  const menuItems: ContextMenuItem[] = [
    {
      displayText: 'File',
      iconRight: faAngleRight,
      children: [
        { displayText: 'New File', iconLeft: faPlusCircle },
        { displayText: 'Upload File', iconLeft: faUpload }
      ]
    },
    {
      displayText: 'Folder',
      iconRight: faAngleRight,
      children: [
        { displayText: 'New Folder', iconLeft: faPlusCircle },
        { displayText: 'Upload Folder', iconLeft: faUpload }
      ]
    },
    { displayText: 'Customize...' }
  ];
  const menu = new ContextMenuViewModel(menuItems);

  return (
    <Draggable initialPosition={{ x, y }}>
      <BoardHeader className="text-muted mb-1">
        {name}
      </BoardHeader>
      <BoardContainer height={height} width={width} ref={viewportRef}>
        <ViewportProvider value={viewportRef}>
          <ContextMenu menu={menu} />
          {files?.map((file) => (
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
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};

export default Board;
