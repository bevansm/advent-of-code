import fs from 'fs';
import path from 'path';

interface Bag {
  color: string;
  toBags: { [key: string]: number };
  fromBags: { [key: string]: number };
}

const input: { [key: string]: Bag } = fs
  .readFileSync(path.join(__dirname, 'input.txt'))
  .toString()
  .split('\n')
  .reduce<{ [key: string]: Bag }>((acc, v) => {
    const [description, contents] = v.split('contain').map(v => v.trim());
    const color = description.substring(0, description.indexOf('bags')).trim();
    acc[color] = {
      color,
      toBags:
        contents.indexOf('no other') > -1
          ? {}
          : contents
              .split(',')
              .map(v => v.trim().split(' '))
              .reduce<{ [key: string]: number }>((acc, v) => {
                const [count, adj, color] = v;
                acc[`${adj} ${color}`] = parseInt(count);
                return acc;
              }, {}),
      fromBags: {},
    };
    return acc;
  }, {});

Object.values(input).forEach(b =>
  Object.entries(b.toBags).forEach(([tbc, tbn]) => (input[tbc].fromBags[b.color] = tbn))
);

function part1(input: { [key: string]: Bag }) {
  const bags = new Set<string>();
  const toProcess: string[] = Object.keys(input['shiny gold'].fromBags);
  while (toProcess.length) {
    const color = toProcess.pop();
    if (bags.has(color)) continue;
    bags.add(color);
    toProcess.push(...Object.keys(input[color].fromBags));
  }
  return bags.size;
}

function part2(input: { [key: string]: Bag }) {
  const cache: { [key: string]: number } = {};
  function findBags(bag: Bag) {
    return Object.entries(bag.toBags).reduce((acc, [bagName, count]) => {
      if (!cache[bagName]) cache[bagName] = 1 + findBags(input[bagName]);
      return acc + count * cache[bagName];
    }, 0);
  }
  return findBags(input['shiny gold']);
}

console.log(part1(input));
console.log(part2(input));
