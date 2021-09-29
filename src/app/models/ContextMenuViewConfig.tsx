import { ContextMenuItem } from "./ContextMenuItem";
import { ICoordinates } from "./ICoordinates";

export class ContextMenuConfig {
  menuItems: ContextMenuItem[];
  allowContextMenu: boolean;
  position: ICoordinates;

  constructor(menuItems: ContextMenuItem[], allowContextMenu = true) {
    this.menuItems = menuItems;
    this.allowContextMenu = allowContextMenu;
  }
}
