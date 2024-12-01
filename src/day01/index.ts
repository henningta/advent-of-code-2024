import run from 'aocrunner';

const parseInput = (rawInput: string) => {
  const [left, right] = [[] as number[], [] as number[]];

  rawInput.split('\n').forEach((line) => {
    const [lnum, rnum] = line.split('   ').map((x) => parseInt(x));

    left.push(lnum);
    right.push(rnum);
  });

  return [left.sort(), right.sort()];
};

const parseInput2 = (rawInput: string) => {
  const [left, right] = [
    {} as Record<string, number>,
    {} as Record<string, number>,
  ];

  rawInput.split('\n').forEach((line) => {
    const [lnum, rnum] = line.split('   ');

    left[lnum] = left[lnum] ? left[lnum] + 1 : 1;
    right[rnum] = right[rnum] ? right[rnum] + 1 : 1;
  });

  return [left, right];
};

const part1 = (rawInput: string) => {
  const [left, right] = parseInput(rawInput);

  return left.reduce((acc, lnum, i) => {
    const rnum = right[i];
    return acc + Math.abs(lnum - rnum);
  }, 0);
};

const part2 = (rawInput: string) => {
  const [left, right] = parseInput2(rawInput);

  return Object.entries(left).reduce((acc, [key, count]) => {
    if (right[key]) {
      const val = parseInt(key);
      acc += count * val * right[key];
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
