import { Instruction } from './Directions';

export abstract class Ship {
  public x = 0;
  public y = 0;

  abstract execute(i: Instruction): void;

  public solve() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
}
