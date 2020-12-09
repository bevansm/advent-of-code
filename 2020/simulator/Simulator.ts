import fs from 'fs';

export enum Command {
  NOP = 'nop',
  ACC = 'acc',
  JMP = 'jmp',
}

export interface Instruction {
  cmd: Command;
  val: number;
}

export const parseInstructionFile = (path: string): Instruction[] =>
  fs
    .readFileSync(path)
    .toString()
    .split('\n')
    .map(v => {
      const [cmd, rawVal] = v.split(' ') as [Command, string];
      return { cmd, val: parseInt(rawVal) };
    });

export class Simulator {
  public rsp: number;
  public acc: number;
  private instructions: Instruction[];
  private visited: Set<number>;
  private loop: boolean;

  // Creates an instruction set given either a filepath or an instruction arr
  // If loop is true, lets simulator revisit instruction, else, will throw an error
  constructor(instructionSet: string | Instruction[], loop = false) {
    if (typeof instructionSet === 'string') {
      this.instructions = parseInstructionFile(instructionSet);
    } else {
      this.instructions = instructionSet;
    }

    this.rsp = 0;
    this.acc = 0;
    this.visited = new Set();
    this.loop = loop;
  }

  public run() {
    while (this.rsp < this.instructions.length) {
      if (this.visited.has(this.rsp) && !this.loop) throw new Error('Unable to execute program without looping');
      this.visited.add(this.rsp);
      this.execute(this.instructions[this.rsp]);
    }
  }

  private execute(i: Instruction) {
    const { cmd, val } = i;
    switch (cmd) {
      case Command.JMP:
        this.rsp += val;
        break;
      case Command.ACC:
        this.acc += val;
      case Command.NOP:
        this.rsp++;
      default:
        break;
    }
  }
}

export default Simulator;
