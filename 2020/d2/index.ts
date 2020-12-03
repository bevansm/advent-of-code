import fs from 'fs';
import path from 'path';

interface Password {
  low: number;
  high: number;
  char: string;
  password: string;
}

const input = fs
  .readFileSync(path.join(__dirname, 'input.txt'))
  .toString()
  .split('\n')
  .map<Password>(v => {
    const [range, char, password] = v.split(' ');
    const [low, high] = range.split('-').map(v => parseInt(v));
    return {
      low,
      high,
      char: char.substring(0, char.length - 1),
      password: password.trim(),
    };
  });

function isValidP1(p: Password) {
  const { password, high, low, char } = p;
  let count = 0;
  for (let i = 0; i < password.length; i++) {
    if (password.charAt(i) === char) count++;
    if (count > high) return false;
  }
  return count >= low;
}

function isValidP2(p: Password) {
  const { password, high, low, char } = p;
  const atLow = password.charAt(low - 1) === char;
  const atHigh = password.charAt(high - 1) === char;
  return password.length >= high && (atLow || atHigh) && !(atLow && atHigh);
}

console.log(input.filter(isValidP1).length);
console.log(input.filter(isValidP2).length);
