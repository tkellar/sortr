import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Draggable from '../wrappers/Draggable';
import { BoundingContainerProvider } from '../context/BoundingContainerContext';
import { BoardViewModel, ContextMenuItem, ContextMenuConfig, IHeightWidth } from '../models';
import { faAngleRight, faPlusCircle, faTimesCircle, faUpload } from '@fortawesome/free-solid-svg-icons';
import PageItemFactory from './PageItemFactory';
import useClickOutside from '../hooks/useClickOutside';
import pageItemSubject from '../subjects/PageItemSubject';
import useContextMenu from '../hooks/useContextMenu';

interface IBoardProps {
  board: BoardViewModel;
  parentPageItemId: number;
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

function Board({ board, parentPageItemId }: IBoardProps): JSX.Element {
  const { id, name, height, width, x, y, childPageItemIds } = board;
  const [selected, setSelected] = useState(false);

  const boardRef = useClickOutside<HTMLDivElement>(() => {
    setSelected(false);
  });

  async function deleteThisBoard(): Promise<void> {
    await pageItemSubject.deleteChild(parentPageItemId, id);
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

  useContextMenu(boardRef, new ContextMenuConfig(menuItems));

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
        <BoundingContainerProvider value={boardRef}>
          {childPageItemIds?.map((childId) => (
            <PageItemFactory key={childId} pageItemId={childId} parentPageItemId={board.id} />
          ))}
        </BoundingContainerProvider>
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
