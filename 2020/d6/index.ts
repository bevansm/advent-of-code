import fs from 'fs';
import path from 'path';

const input = fs
  .readFileSync(path.join(__dirname, 'input.txt'))
  .toString()
  .split(/(\r\n){2}/)
  .map(v => v.trim())
  .filter(v => !!v)
  .map(l =>
    l
      .split('\n')
      .map(v => v.trim().split(''))
      .filter(v => !!v.length)
  );

// Union of sets
const part1 = (groups: string[][][]) =>
  groups.reduce((acc, group) => {
    const questions = new Set();
    group.forEach(ans => ans.forEach(v => questions.add(v)));
    return acc + questions.size;
  }, 0);

// Intersection of sets
const part2 = (groups: string[][][]) =>
  groups.reduce((acc, group) => {
    let questions = new Set(group[0]);
    group.forEach(ans => (questions = new Set(ans.filter(v => questions.has(v)))));
    return acc + questions.size;
  }, 0);

console.log(part1(input));
console.log(part2(input));
