import run from 'aocrunner';

const parseInput = (rawInput: string) =>
  rawInput.split(' ').map((x) => parseInt(x));

function memoize(func) {
  var memo = {};
  var slice = Array.prototype.slice;

  return function () {
    var args = slice.call(arguments);

    if (args in memo) {
      return memo[args];
    }

    return (memo[args] = func.apply(this, args));
  };
}

let evolve = (n: number, level: number): number => {
  if (level === 0) {
    return 1;
  }

  if (n === 0) {
    return evolve(1, level - 1);
  }

  const nStr = n.toString();
  if (nStr.length % 2 === 0) {
    const left = parseInt(nStr.slice(0, nStr.length / 2));
    const right = parseInt(nStr.slice(-nStr.length / 2));
    return evolve(left, level - 1) + evolve(right, level - 1);
  }

  return evolve(n * 2024, level - 1);
};

evolve = memoize(evolve);

const part1 = (rawInput: string) => {
  let stones = parseInput(rawInput);
  return stones.reduce((acc, stone) => acc + evolve(stone, 25), 0);
};

const part2 = (rawInput: string) => {
  let stones = parseInput(rawInput);
  return stones.reduce((acc, stone) => acc + evolve(stone, 75), 0);
};

run({
  part1: {
    tests: [
      {
        input: `125 17`,
        expected: 55312,
      },
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
