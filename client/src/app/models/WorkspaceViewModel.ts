import { PageViewModel } from '.';

export class WorkspaceViewModel {
  _id: string;
  userId: string;
  name: string;
  pages: PageViewModel[];
  createdDate: Date;
  updatedDate?: Date;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  constructor(init: unknown) {
    Object.assign(this, init);
  }
}
