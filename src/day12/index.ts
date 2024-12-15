import run from 'aocrunner';

const parseInput = (rawInput: string) =>
  rawInput.split('\n').map((x) => x.split(''));

const directions = [
  [-1, 0], // up
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
];

const getCoordKey = (x: number, y: number) => `${x},${y}`;

const inBounds = <T>(map: T[][], x: number, y: number) =>
  y >= 0 && x >= 0 && y < map.length && x < map[y].length;

const part1 = (rawInput: string) => {
  const map = parseInput(rawInput);

  const seen = new Set<string>();

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const stack = [{ x, y }];
      const grid = new Set<string>();

      while (stack.length) {
        const { x, y } = stack.pop()!;
        const key = getCoordKey(x, y);
        if (seen.has(key)) {
          continue;
        }

        const val = map[y][x];

        seen.add(key);

        stack.push(
          ...directions
            .map(([yDir, xDir]) => ({ x: x + xDir, y: y + yDir }))
            .filter(
              ({ x, y }) => inBounds(map, x, y) && !seen.has(getCoordKey(x, y)),
            ),
        );
      }
    }
  }
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
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
