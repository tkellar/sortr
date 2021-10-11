export class PageViewModel {
  _id: string;
  name: string;
  createdDate: Date;
  updatedDate?: Date;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }
}
