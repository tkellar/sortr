import { IHeightWidth, ICoordinates } from '.';

export class BoardViewModel implements IHeightWidth, ICoordinates {
  id: number;
  name: string;
  height: number;
  width: number;
  x: number;
  y: number;
}
