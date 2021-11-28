function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export enum CardinalDirection {
  NORTH = 'N',
  SOUTH = 'S',
  EAST = 'E',
  WEST = 'W',
}

export enum AbsoluteDirection {
  LEFT = 'L',
  RIGHT = 'R',
  FORWARD = 'F',
}

export type Direction = CardinalDirection | AbsoluteDirection;

const directions = [CardinalDirection.NORTH, CardinalDirection.EAST, CardinalDirection.SOUTH, CardinalDirection.WEST];

export const rotate = (currentDir: CardinalDirection, ticks: number) =>
  directions[mod(directions.indexOf(currentDir) + ticks, 4)];

export interface Instruction {
  dir: Direction;
  amt: number;
}
