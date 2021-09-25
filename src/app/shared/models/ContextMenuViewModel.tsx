import { ContextMenuItem } from "./ContextMenuItem";

export class ContextMenuViewModel {
  menuItems: ContextMenuItem[];
  allowContextMenu: boolean;

  constructor(menuItems: ContextMenuItem[], allowContextMenu = true) {
    this.menuItems = menuItems;
    this.allowContextMenu = allowContextMenu;
  }
}
