import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { ICoordinates } from "./ICoordinates";

export class ContextMenuItem {
  displayText: string;
  onClickAction?: (menuPosition: ICoordinates) => void;
  iconLeft?: IconDefinition;
  iconRight?: IconDefinition;
  children?: ContextMenuItem[];
}
