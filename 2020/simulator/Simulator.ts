export enum Command {
  NOP = 'nop',
  ACC = 'acc',
  JMP = 'jmp',
}

export interface Instruction {
  cmd: Command;
  val: number;
}

export interface State {
  acc: number;
  rsp: number;
}

export function execute(i: Instruction, state: State) {
  const { cmd, val } = i;
  switch (cmd) {
    case Command.JMP:
      state.rsp += val;
      break;
    case Command.ACC:
      state.acc += val;
    case Command.NOP:
      state.rsp++;
    default:
      break;
  }
}

export default execute;
