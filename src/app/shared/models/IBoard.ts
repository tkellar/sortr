import { IHeightWidth, ICoordinates } from '.';

export interface IBoard extends IHeightWidth, ICoordinates {
  id: number;
  name: string;
}
