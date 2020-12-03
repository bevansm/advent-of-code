import fs from 'fs';
import path from 'path';

const input = fs
  .readFileSync(path.join(__dirname, 'input.txt'))
  .toString()
  .split('\n')
  .map(v => parseInt(v));

function solveP1(arr: number[], n: number) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === n) return arr[i] * arr[j];
    }
  }
  return -1;
}

function solveP2(arr: number[], n: number) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      for (let k = j + 1; k < arr.length; k++) {
        if (arr[i] + arr[j] + arr[k] === n) return arr[i] * arr[j] * arr[k];
      }
    }
  }
  return -1;
}

console.log(solveP1(input, 2020));
console.log(solveP2(input, 2020));
