import fs from 'fs';
import path from 'path';
import { Instruction, Command, execute } from '../simulator/Simulator';

const input: Instruction[] = fs
  .readFileSync(path.join(__dirname, 'input.txt'))
  .toString()
  .split('\n')
  .map(v => {
    const [cmd, rawVal] = v.split(' ') as [Command, string];
    return { cmd, val: parseInt(rawVal) };
  });

function part1(arr: Instruction[]) {
  const visited = new Set<number>();
  const state = { rsp: 0, acc: 0 };
  while (state.rsp < arr.length) {
    if (visited.has(state.rsp)) break;
    visited.add(state.rsp);
    execute(arr[state.rsp], state);
  }
  return state.acc;
}

function flipCommand(i: Instruction) {
  if (i.cmd === Command.JMP) i.cmd = Command.NOP;
  else if (i.cmd === Command.NOP) i.cmd = Command.JMP;
}

function part2(arr: Instruction[]) {
  for (let i = 0; i < arr.length; i++) {
    // If this is equal to a command where we can't branch, continue
    if (arr[i].cmd === Command.ACC) continue;

    // If we can branch, flip the command
    flipCommand(arr[i]);

    // Try to run the program through w/ the new commands
    const visited = new Set<number>();
    const state = { rsp: 0, acc: 0 };
    while (state.rsp < arr.length) {
      if (visited.has(state.rsp)) break;
      visited.add(state.rsp);
      execute(arr[state.rsp], state);
    }

    // Cleanup the branch commands
    flipCommand(arr[i]);

    // If we've reached the end, return the value of acc
    if (state.rsp >= arr.length) return state.acc;
  }

  throw new Error('Unable to find an execution path through the given code.');
}

console.log(part1(input));
console.log(part2(input));
