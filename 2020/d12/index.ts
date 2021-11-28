import path from 'path';
import fs from 'fs';
import { SimpleShip } from './Ships/SimpleShip';
import { Instruction, Direction } from './Ships/Directions';
import { WaypointShip } from './Ships/WaypointShip';
import { Ship } from './Ships/IShip';

const input: Instruction[] = fs
  .readFileSync(path.join(__dirname, 'res.txt'))
  .toString()
  .split('\n')
  .map(s => ({ dir: s.charAt(0) as Direction, amt: parseInt(s.substring(1)) }));

const solve = (input: Instruction[], ship: Ship) => {
  input.forEach(i => ship.execute(i));
  return ship.solve();
};

console.log(solve(input, new SimpleShip()));
console.log(solve(input, new WaypointShip()));
