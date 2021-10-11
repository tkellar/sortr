export class UserViewModel {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  createdDate: Date;

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
