import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput.split('\n');

const checkXmas = (input: string[], y: number, x: number) => {
  let xmas = 0;

  if (
    y - 3 >= 0 &&
    x - 3 >= 0 &&
    input[y - 1][x - 1] === 'M' &&
    input[y - 2][x - 2] === 'A' &&
    input[y - 3][x - 3] === 'S'
  ) {
    // up-left
    xmas += 1;
  }

  if (
    y - 3 >= 0 &&
    input[y - 1][x] === 'M' &&
    input[y - 2][x] === 'A' &&
    input[y - 3][x] === 'S'
  ) {
    // up
    xmas += 1;
  }

  if (
    y - 3 >= 0 &&
    x + 3 < input[y].length &&
    input[y - 1][x + 1] === 'M' &&
    input[y - 2][x + 2] === 'A' &&
    input[y - 3][x + 3] === 'S'
  ) {
    // up-right
    xmas += 1;
  }

  if (
    x + 3 < input[y].length &&
    input[y][x + 1] === 'M' &&
    input[y][x + 2] === 'A' &&
    input[y][x + 3] === 'S'
  ) {
    // right
    xmas += 1;
  }

  if (
    y + 3 < input.length &&
    x + 3 < input[y].length &&
    input[y + 1][x + 1] === 'M' &&
    input[y + 2][x + 2] === 'A' &&
    input[y + 3][x + 3] === 'S'
  ) {
    // right-down
    xmas += 1;
  }

  if (
    y + 3 < input.length &&
    input[y + 1][x] === 'M' &&
    input[y + 2][x] === 'A' &&
    input[y + 3][x] === 'S'
  ) {
    // down
    xmas += 1;
  }

  if (
    y + 3 < input.length &&
    x - 3 >= 0 &&
    input[y + 1][x - 1] === 'M' &&
    input[y + 2][x - 2] === 'A' &&
    input[y + 3][x - 3] === 'S'
  ) {
    // down-left
    xmas += 1;
  }

  if (
    x - 3 >= 0 &&
    input[y][x - 1] === 'M' &&
    input[y][x - 2] === 'A' &&
    input[y][x - 3] === 'S'
  ) {
    // left
    xmas += 1;
  }

  return xmas;
};

const checkXmas2 = (input: string[], y: number, x: number) => {
  if (
    y - 1 < 0 ||
    x - 1 < 0 ||
    y + 1 >= input.length ||
    x + 1 >= input[y].length
  ) {
    return false;
  }

  return (
    ((input[y - 1][x - 1] === 'M' && input[y + 1][x + 1] === 'S') ||
      (input[y - 1][x - 1] === 'S' && input[y + 1][x + 1] === 'M')) &&
    ((input[y + 1][x - 1] === 'M' && input[y - 1][x + 1] === 'S') ||
      (input[y + 1][x - 1] === 'S' && input[y - 1][x + 1] === 'M'))
  );
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let xmas = 0;
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] === 'X') {
        xmas += checkXmas(input, y, x);
      }
    }
  }

  return xmas;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let xmas = 0;
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] === 'A') {
        xmas += checkXmas2(input, y, x) ? 1 : 0;
      }
    }
  }

  return xmas;
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
