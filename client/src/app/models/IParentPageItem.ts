export interface IParentPageItem {
  childPageItemIds: number[];
}

export function isParentPageItem(object: unknown): object is IParentPageItem {
  return Object.prototype.hasOwnProperty.call(object, 'childPageItemIds');
}
