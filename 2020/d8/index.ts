import path from 'path';
import Simulator, { Instruction, Command, parseInstructionFile } from '../simulator/Simulator';

const input: Instruction[] = parseInstructionFile(path.join(__dirname, 'input.txt'));

function part1(arr: Instruction[]) {
  const sim = new Simulator(arr);
  try {
    sim.run();
  } catch (e) {}
  return sim.state.acc;
}

function flipCommand(i: Instruction) {
  if (i.cmd === Command.JMP) i.cmd = Command.NOP;
  else if (i.cmd === Command.NOP) i.cmd = Command.JMP;
}

function part2(arr: Instruction[]) {
  for (let i = 0; i < arr.length; i++) {
    // If this is a command where we can't branch, continue
    if (arr[i].cmd === Command.ACC) continue;

    // If we can branch, flip the command
    flipCommand(arr[i]);

    // Try to run the program through w/ the new commands
    const sim = new Simulator(arr);
    try {
      sim.run();
    } catch (e) {
      flipCommand(arr[i]);
      continue;
    }

    flipCommand(arr[i]);
    return sim.state.acc;
  }

  throw new Error('Unable to find an execution path through the given code.');
}

console.log(part1(input));
console.log(part2(input));
