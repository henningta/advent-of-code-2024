import run from 'aocrunner';

type InputLine = {
  left: number;
  right: number[];
};

const parseInput = (rawInput: string): InputLine[] =>
  rawInput.split('\n').map((x) => {
    const [left, right] = x.split(': ');
    return {
      left: parseInt(left),
      right: right.split(' ').map((x) => parseInt(x)),
    };
  });

const permutate = <T>(items: T[], count: number) => {
  const results: T[][] = [];

  req([]);

  return results;

  function req(array: T[]) {
    if (array.length == count) {
      results.push(array);
      return;
    }
    for (const item of items) {
      req(array.concat(item));
    }
  }
};

const runOperations = (lines: InputLine[], operators: string[]) =>
  lines.reduce((acc, { left, right }) => {
    const permutations = permutate(operators, right.length - 1);

    for (const ops of permutations) {
      const result = right
        .slice(1)
        .reduce(
          (result, n, i) =>
            ops[i] === 'add'
              ? (result += n)
              : ops[i] === 'mul'
                ? (result *= n)
                : +`${result}${n}`,
          right[0],
        );

      if (result === left) {
        return acc + result;
      }
    }

    return acc;
  }, 0);

const part1 = (rawInput: string) => {
  const lines = parseInput(rawInput);
  return runOperations(lines, ['add', 'mul']);
};

const part2 = (rawInput: string) => {
  const lines = parseInput(rawInput);
  return runOperations(lines, ['add', 'mul', 'concat']);
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
