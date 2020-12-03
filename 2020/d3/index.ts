import fs from 'fs';
import path from 'path';

const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\n');

function countTrees(arr: string[], incX: number, incY: number) {
  let x = incX;
  let trees = 0;
  for (let y = incY; y < arr.length; y += incY) {
    if (arr[y].charAt(x) === '#') trees++;
    x = (x + incX) % (arr[y].length - 1);
  }
  return trees;
}

console.log(countTrees(input, 3, 1));

const pairs = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];
const p2 = pairs.reduce((acc, [x, y]) => acc * countTrees(input, x, y), 1);
console.log(p2);
