import { ICoordinates } from '../models';

/**
 * @param event A mouse event
 * @param boundingElt The HTMLElement related to this clickevent
 * @returns Coordinate offset from the upper-left of the event target
 */
export function getMouseOffset(event: MouseEvent, boundingElt: HTMLElement): ICoordinates {
  const boundingRect = boundingElt.getBoundingClientRect();

  return {
    x: Math.floor(event.clientX - boundingRect.left),
    y: Math.floor(event.clientY - boundingRect.top),
  };
}
