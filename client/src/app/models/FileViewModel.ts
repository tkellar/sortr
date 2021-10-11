import { ICoordinates } from './ICoordinates';
import { PageItemBase } from './PageItemBase';

export class FileViewModel extends PageItemBase implements ICoordinates {
  extension: string;
  x: number;
  y: number;
}
