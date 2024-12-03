import run from 'aocrunner';

const mulRegex = /mul\((\d+),(\d+)\)/g;

const mulRegex2 = /do\(\)|don't\(\)|mul\((\d+),(\d+)\)/g;

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let sum = 0;

  let match: RegExpExecArray | null;
  while ((match = mulRegex.exec(input)) !== null) {
    sum += +match[1] * +match[2];
  }

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let sum = 0;
  let summing = true;

  let match: RegExpExecArray | null;
  while ((match = mulRegex2.exec(input)) !== null) {
    if (match[0] === 'do()') {
      summing = true;
    } else if (match[0] === "don't()") {
      summing = false;
    } else if (summing) {
      sum += +match[1] * +match[2];
    }
  }

  return sum;
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
