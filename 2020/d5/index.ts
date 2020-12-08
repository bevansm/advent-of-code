import fs from 'fs';
import { sortBy } from 'lodash';
import path from 'path';

interface BoardingPass {
  col: number;
  row: number;
  seatId: number;
  pass: string;
}

const input: BoardingPass[] = sortBy(
  fs
    .readFileSync(path.join(__dirname, 'input.txt'))
    .toString()
    .split('\n')
    .map(p => {
      let rowMax = 127;
      let rowMin = 0;
      for (let i = 0; i < 7; i++) {
        const half = (rowMin + rowMax) / 2;
        if (p.charAt(i) === 'B') {
          rowMin = Math.ceil(half);
        } else {
          rowMax = Math.floor(half);
        }
      }

      let colMax = 7;
      let colMin = 0;
      for (let i = 7; i < 10; i++) {
        const half = (colMax + colMin) / 2;
        if (p.charAt(i) === 'R') {
          colMin = Math.ceil(half);
        } else {
          colMax = Math.floor(half);
        }
      }

      return { row: rowMin, col: colMin, seatId: colMin + 8 * rowMin, pass: p.trim() };
    }),
  'seatId'
);

// Finds the missing boarding pass
// We could do a modified binary search, but I'm currently too out of it to think
function findMissing(passes: BoardingPass[]) {
  for (let i = 1; i < passes.length - 1; i++) {
    if (passes[i - 1].seatId - passes[i].seatId != -1) return passes[i].seatId - 1;
  }
  return undefined;
}

console.log(input[input.length - 1]);
console.log(findMissing(input));
