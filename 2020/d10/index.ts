import path from 'path';
import fs from 'fs';
import { isNumber } from 'lodash';

const input = fs
  .readFileSync(path.join(__dirname, 'input.txt'))
  .toString()
  .split('\n')
  .map(v => parseInt(v))
  .sort((a, b) => a - b);

function part1(arr: number[]) {
  let j1 = 0;
  let j3 = 0;

  for (let i = 0; i < arr.length; i++) {
    const diff = arr[i] - (arr[i - 1] || 0);
    if (diff > 3) break;
    if (diff === 1) j1++;
    else if (diff === 3) j3++;
  }
  j3++;
  return j1 * j3;
}

function part2(arr: number[]) {
  const cache: { [key: string]: number } = {};
  function helper(idx: number, prev: number): number {
    if (arr[idx] - prev > 3 || idx >= arr.length) return 0;
    if (idx === arr.length - 1) return 1;

    const key = `${idx},${prev}`;
    if (cache[key] === undefined) {
      cache[key] = helper(idx + 1, arr[idx]) + helper(idx + 1, prev);
    }
    return cache[key];
  }
  return helper(0, 0);
}

console.log(part1(input));
console.log(part2(input));
