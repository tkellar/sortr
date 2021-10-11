import { faPlusCircle, faUpload, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import useBoundingContainerContext from '../context/BoundingContainerContext';
import useContextMenu from '../hooks/useContextMenu';
import { ContextMenuItem, ContextMenuConfig } from '../models';

function Page({ pageId }: { pageId: string }): JSX.Element {
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
    { displayText: 'Customize...' }
  ];

  const viewportRef = useBoundingContainerContext();
  useContextMenu(viewportRef, new ContextMenuConfig(menuItems));

  return (
    <div className="Page"></div>
  );
}

export default Page;
