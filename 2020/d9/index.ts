import path from 'path';
import fs from 'fs';
import { max, min } from 'lodash';

const input = fs
  .readFileSync(path.join(__dirname, 'res.txt'))
  .toString()
  .split('\n')
  .map(v => parseInt(v));

function part1(n: number[], preamble: number) {
  for (let i = preamble; i < n.length; i++) {
    let hasPair = false;
    for (let j = i - preamble; j < i; j++) {
      for (let k = j; k < i; k++) {
        if (n[i] === n[k] + n[j]) {
          hasPair = true;
          break;
        }
      }
      if (hasPair) break;
    }
    if (!hasPair) return n[i];
  }
}

// Sliding window
function part2(n: number[], preamble: number) {
  const weakness = part1(n, preamble);
  let acc = 0;
  let start = 0;
  let end = 0;

  while (end < n.length) {
    if (acc > weakness) {
      acc -= n[start];
      start++;
      continue;
    } else if (acc === weakness) {
      const subArr = n.slice(start, end + 1);
      return max(subArr) + min(subArr);
    }
    acc += n[end];
    end++;
  }
}

console.log(part1(input, 5));
console.log(part2(input, 5));
