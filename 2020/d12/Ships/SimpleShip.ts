import { CardinalDirection, AbsoluteDirection, Instruction, rotate } from './Directions';
import { Ship } from './IShip';

export class SimpleShip extends Ship {
  private dir = CardinalDirection.EAST;
  public x = 0;
  public y = 0;

  private rotate(dir: AbsoluteDirection, ticks: number) {
    switch (dir) {
      case AbsoluteDirection.LEFT:
        this.dir = rotate(this.dir, -1 * ticks);
        break;
      case AbsoluteDirection.RIGHT:
        this.dir = rotate(this.dir, ticks);
        break;
    }
  }

  private move(dir: CardinalDirection, amt: number) {
    switch (dir) {
      case CardinalDirection.NORTH:
        this.y -= amt;
        break;
      case CardinalDirection.EAST:
        this.x += amt;
        break;
      case CardinalDirection.SOUTH:
        this.y += amt;
        break;
      case CardinalDirection.WEST:
        this.x -= amt;
        break;
    }
  }

  public execute(i: Instruction) {
    switch (i.dir) {
      case AbsoluteDirection.RIGHT:
      case AbsoluteDirection.LEFT:
        this.rotate(i.dir, i.amt / 90);
        break;
      case AbsoluteDirection.FORWARD:
        this.move(this.dir, i.amt);
        break;
      default:
        this.move(i.dir, i.amt);
        break;
    }
  }
}
