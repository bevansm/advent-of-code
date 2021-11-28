import path from 'path';
import fs from 'fs';
import { cloneDeep, isEqual, isNumber } from 'lodash';

enum Seat {
  EMPTY = 'L',
  OCCUPIED = '#',
  FLOOR = '.',
}

type CountFunction = (x: number, y: number, seats: string[][]) => number;

const input = fs
  .readFileSync(path.join(__dirname, 'input.txt'))
  .toString()
  .split('\n')
  .map(s => s.trim().split(''));

const getVal = (s: string) => (s === Seat.OCCUPIED ? 1 : 0);

const countOccupied = (arr: string[][]) => arr.reduce((acc, v) => acc + v.reduce((acc, v) => acc + getVal(v), 0), 0);

const getCountVisibleOccupied = (input: string[][]): CountFunction => {
  // Create a cache where we can hold the "visible" seats for each seat
  // We can do so by looking at "pairs" of seats along each of the four directions
  // O(n^2) to create this caching
  const visible: number[][][][] = input.map(v => v.map(() => []));

  let prevX: number;
  let prevY: number;

  const updateVisible = (i: number, j: number) => {
    if (input[i]?.[j] === Seat.EMPTY) {
      if (isNumber(prevX) && isNumber(prevY)) {
        visible[prevY][prevX].push([i, j]);
        visible[i][j].push([prevY, prevX]);
      }
      prevX = j;
      prevY = i;
    }
  };

  const clearVisible = () => {
    prevX = undefined;
    prevY = undefined;
  };

  // Build up pairs along rows
  for (let i = 0; i < input.length; i++) {
    clearVisible();
    for (let j = 0; j < input[i].length; j++) {
      updateVisible(i, j);
    }
  }

  // Build up pairs of seats along cols
  for (let j = 0; j < input[0].length; j++) {
    clearVisible();
    for (let i = 0; i < input.length; i++) {
      updateVisible(i, j);
    }
  }

  // Build up pairs along left diags
  const maxDim = Math.max(input.length, input[0].length);
  for (let diag = 0; diag <= 2 * (maxDim - 1); diag++) {
    clearVisible();
    for (let y = 0; y < input.length; y++) {
      const x = diag - y;
      if (x > -1 && x < input[0].length) {
        updateVisible(y, x);
      }
    }
  }

  // Build up pairs along right diags
  for (let diag = 0; diag <= 2 * (maxDim - 1); diag++) {
    clearVisible();
    for (let y = 0; y < input.length; y++) {
      const x = diag - (input.length - y);
      if (x > -1 && x < input[0].length) {
        updateVisible(y, x);
      }
    }
  }

  return (x, y, seats) => visible[x][y].reduce((acc, [i, j]) => acc + getVal(seats[i]?.[j]), 0);
};

const countAdjacentOccupied: CountFunction = (x, y, seats) =>
  getVal(seats[x - 1]?.[y]) +
  getVal(seats[x - 1]?.[y - 1]) +
  getVal(seats[x - 1]?.[y + 1]) +
  getVal(seats[x]?.[y - 1]) +
  getVal(seats[x]?.[y + 1]) +
  getVal(seats[x + 1]?.[y]) +
  getVal(seats[x + 1]?.[y - 1]) +
  getVal(seats[x + 1]?.[y + 1]);

const getNext = (prev: string[][], count: CountFunction, toEmpty: number) => {
  const next = cloneDeep(prev);
  for (let i = 0; i < prev.length; i++) {
    for (let j = 0; j < prev[i].length; j++) {
      const adj = count(i, j, prev);
      if (prev[i][j] === Seat.EMPTY && adj === 0) {
        next[i][j] = Seat.OCCUPIED;
      } else if (prev[i][j] === Seat.OCCUPIED && adj >= toEmpty) {
        next[i][j] = Seat.EMPTY;
      }
    }
  }
  return next;
};

const solve = (input: string[][], count: CountFunction, toEmpty: number) => {
  let prev = input;
  let next = input;
  do {
    prev = next;
    next = getNext(prev, count, toEmpty);
  } while (!isEqual(prev, next));
  return countOccupied(next);
};

console.log(solve(input, countAdjacentOccupied, 4));
console.log(solve(input, getCountVisibleOccupied(input), 5));
