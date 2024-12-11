import run from 'aocrunner';

const parseInput = (rawInput: string) =>
  rawInput.split('\n').map((x) => x.split('').map((x) => parseInt(x)));

const directions = [
  [-1, 0], // up
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
];

const inBounds = (map: number[][], x: number, y: number) =>
  x >= 0 && y >= 0 && x < map[0].length && y < map.length;

const getCoordKey = (x: number, y: number) => `${x},${y}`;

const findTrails = (map: number[][], x: number, y: number) => {
  if (map[y][x] !== 0) {
    return [0, 0];
  }

  let positions = new Set<string>();
  let total = 0;

  const stack = [[y, x]];

  while (stack.length) {
    const [y, x] = stack.pop()!;

    const val = map[y][x];

    directions.forEach(([dirY, dirX]) => {
      const [nextY, nextX] = [y + dirY, x + dirX];
      if (!inBounds(map, nextX, nextY)) {
        return;
      }

      const nextVal = map[nextY][nextX];
      if (nextVal === val + 1) {
        if (nextVal === 9) {
          positions.add(getCoordKey(nextX, nextY));
          ++total;
        } else {
          stack.push([nextY, nextX]);
        }
      }
    });
  }

  return [positions.size, total];
};

const solve = (map: number[][], unique = true) =>
  map.reduce((mapTotal, line, y) => {
    return (
      mapTotal +
      line.reduce((lineTotal, c, x) => {
        if (c === 0) {
          lineTotal += findTrails(map, x, y)[unique ? 0 : 1];
        }
        return lineTotal;
      }, 0)
    );
  }, 0);

const part1 = (rawInput: string) => {
  const map = parseInput(rawInput);
  return solve(map);
};

const part2 = (rawInput: string) => {
  const map = parseInput(rawInput);
  return solve(map, false);
};

run({
  part1: {
    tests: [
      {
        input: `...0...
...1...
...2...
6543456
7.....7
8.....8
9.....9`,
        expected: 2,
      },
      {
        input: `..90..9
...1.98
...2..7
6543456
765.987
876....
987....
`,
        expected: 4,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `.....0.
..4321.
..5..2.
..6543.
..7..4.
..8765.
..9....`,
        expected: 3,
      },
      {
        input: `..90..9
...1.98
...2..7
6543456
765.987
876....
987....`,
        expected: 13,
      },
      {
        input: `012345
123456
234567
345678
4.6789
56789.`,
        expected: 227,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
