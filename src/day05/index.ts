import run from 'aocrunner';

const parseInput = (rawInput: string) => {
  const [rules, input] = rawInput.split('\n\n');

  const rulesMap = rules
    .split('\n')
    .reduce<Record<number, Set<number>>>((acc, rule) => {
      const [left, right] = rule.split('|').map((x) => parseInt(x));
      if (!acc[left]) {
        acc[left] = new Set();
      }

      acc[left].add(right);
      return acc;
    }, {});

  return {
    rulesMap,
    inputs: input.split('\n').map((x) => x.split(',').map((x) => parseInt(x))),
  };
};

const isOrdered = (input: number[], rulesMap: Record<number, Set<number>>) => {
  const seen = new Set<number>();

  for (const n of input) {
    const requiredAfter = rulesMap[n];
    if (seen.intersection(requiredAfter).size > 0) {
      return false;
    }

    seen.add(n);
  }

  return true;
};

const part1 = (rawInput: string) => {
  const { rulesMap, inputs } = parseInput(rawInput);

  return inputs.reduce(
    (acc, input) =>
      isOrdered(input, rulesMap)
        ? acc + input[Math.floor(input.length / 2)]
        : acc,
    0,
  );
};

const part2 = (rawInput: string) => {
  const { rulesMap, inputs } = parseInput(rawInput);

  return inputs.reduce(
    (acc, input) =>
      isOrdered(input, rulesMap)
        ? acc
        : acc +
          [...input].sort((a, b) => (rulesMap[a].has(b) ? -1 : 1))[
            Math.floor(input.length / 2)
          ],
    0,
  );
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
