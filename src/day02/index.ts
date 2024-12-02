import run from 'aocrunner';

const parseInput = (rawInput: string) =>
  rawInput.split('\n').map((line) => line.split(' ').map((x) => parseInt(x)));

const checkLine = (line: number[]) => {
  if (line.length < 2) {
    return false;
  }

  let priorIncreasing = line[1] - line[0] > 0;

  for (let i = 0; i < line.length - 1; i++) {
    const delta = line[i + 1] - line[i];
    const increasing = delta > 0;
    if (delta === 0 || increasing !== priorIncreasing) {
      return false;
    }

    const abs = Math.abs(delta);
    if (abs < 1 || abs > 3) {
      return false;
    }

    priorIncreasing = increasing;
  }

  return true;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return input.reduce((acc, line) => (checkLine(line) ? acc + 1 : acc), 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.reduce((acc, line) => {
    if (checkLine(line)) {
      return acc + 1;
    }

    for (let i = 0; i <= line.length; i++) {
      const sub = [...line.slice(0, i), ...line.slice(i + 1)];
      if (checkLine(sub)) {
        return acc + 1;
      }
    }

    return acc;
  }, 0);
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
