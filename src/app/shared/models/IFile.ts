import { ICoordinates } from './ICoordinates';

export interface IFile extends ICoordinates {
  id: number;
  name: string;
  extension: string;
}
