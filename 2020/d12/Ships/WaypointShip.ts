import { CardinalDirection, AbsoluteDirection, Instruction } from './Directions';
import { Ship } from './IShip';

export class WaypointShip extends Ship {
  public offsetX = 10;
  public offsetY = -1;

  private rotateWaypoint(dir: AbsoluteDirection, degrees: number) {
    const cos = Math.cos(degrees);
    const sin = Math.sin(degrees);

    let xrot;
    let yrot;
    switch (dir) {
      case AbsoluteDirection.LEFT:
        // Counter clockwise
        xrot = cos * this.offsetX - sin * this.offsetY;
        yrot = sin * this.offsetX + cos * this.offsetY;
        break;
      case AbsoluteDirection.RIGHT:
        // Clockwise
        xrot = cos * this.offsetX + sin * this.offsetY;
        yrot = -sin * this.offsetX + cos * this.offsetY;
        break;
    }
    this.offsetX = Math.floor(xrot);
    this.offsetY = Math.floor(yrot);
  }

  private moveWaypoint(dir: CardinalDirection, amt: number) {
    switch (dir) {
      case CardinalDirection.NORTH:
        this.offsetY -= amt;
        break;
      case CardinalDirection.EAST:
        this.offsetX += amt;
        break;
      case CardinalDirection.SOUTH:
        this.offsetY += amt;
        break;
      case CardinalDirection.WEST:
        this.offsetX -= amt;
        break;
    }
  }

  public execute(i: Instruction) {
    switch (i.dir) {
      case AbsoluteDirection.RIGHT:
      case AbsoluteDirection.LEFT:
        this.rotateWaypoint(i.dir, i.amt);
        break;
      case AbsoluteDirection.FORWARD:
        this.x += this.offsetX * i.amt;
        this.y += this.offsetY * i.amt;
        break;
      default:
        this.moveWaypoint(i.dir, i.amt);
        break;
    }
    console.log(this.x, this.y, '||', this.offsetX, this.offsetY);
  }
}
