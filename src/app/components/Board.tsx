import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Draggable from '../wrappers/Draggable';
import { ViewportProvider } from '../context/ViewportContext';
import { BoardViewModel, ContextMenuItem, ContextMenuViewModel, IHeightWidth } from '../models';
import ContextMenu from './ContextMenu';
import { faAngleRight, faPlusCircle, faTimesCircle, faUpload } from '@fortawesome/free-solid-svg-icons';
import UserItemFactory from './UserItemFactory';
import useClickOutside from '../hooks/useClickOutside';
import userItemSubject from '../subjects/UserItemSubject';

interface IBoardProps {
  board: BoardViewModel;
  parentUserItemId: number;
}

const BoardContainer = styled.div<IHeightWidth>`
  position: relative;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  box-shadow: 0 0 10px rgba(0,0,0,0.25);
  background-color: ${(props) => props.theme.colors.grey100};
  transition: box-shadow 0.2s ease-out;

  &.selected {
    box-shadow: 0 0 8px 4px ${props => props.theme.colors.blue};
  }
`;

const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

function Board({ board, parentUserItemId }: IBoardProps): JSX.Element {
  const { id, name, height, width, x, y, childUserItemIds } = board;
  const [selected, setSelected] = useState(false);

  const boardRef = useClickOutside<HTMLDivElement>(() => {
    setSelected(false);
  });

  async function deleteThisBoard(): Promise<void> {
    await userItemSubject.deleteChild(parentUserItemId, id);
  }

  const menuItems: ContextMenuItem[] = [
    { displayText: 'New Board', iconLeft: faPlusCircle },
    { displayText: 'Upload File', iconLeft: faUpload },
    {
      displayText: 'Folder',
      iconRight: faAngleRight,
      children: [
        { displayText: 'New Folder', iconLeft: faPlusCircle },
        { displayText: 'Upload Folder', iconLeft: faUpload }
      ]
    },
    { displayText: 'Customize...' },
    { displayText: 'Delete Board', iconLeft: faTimesCircle, additionalClasses: 'text-danger', onClickAction: deleteThisBoard }
  ];
  const menu = new ContextMenuViewModel(menuItems);

  return (
    <Draggable allowDrag={selected} initialPosition={{ x, y }}>
      <BoardHeader className="text-muted mb-1">
        {name}
      </BoardHeader>
      <BoardContainer
        className={selected ? 'selected' : ''}
        height={height}
        width={width}
        ref={boardRef}
        onClick={() => setSelected(true)}
      >
        <ViewportProvider value={boardRef}>
          <ContextMenu menu={menu} />
          {childUserItemIds?.map((childId) => (
            <UserItemFactory key={childId} userItemId={childId} parentUserItemId={board.id} />
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
