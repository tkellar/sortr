export interface IUserItemParent {
  childUserItemIds: number[];
}

export function isUserItemParent(object: unknown): object is IUserItemParent {
  return Object.prototype.hasOwnProperty.call(object, 'childUserItemIds');
}
