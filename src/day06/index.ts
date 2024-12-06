import run from 'aocrunner';

const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const parseInput = (rawInput: string) =>
  rawInput.split('\n').map((x) => x.split(''));

const findGuard = (map: string[][]) => {
  let guardY = -1;
  let guardX = -1;

  for (let y = 0; y <= map.length; y++) {
    const row = map[y];
    guardX = row.findIndex((col) => col === '^');
    if (guardX !== -1) {
      guardY = y;
      break;
    }
  }

  return [guardX, guardY];
};

const part1 = (rawInput: string) => {
  const map = parseInput(rawInput);

  const positions = new Set<string>();

  let [guardX, guardY] = findGuard(map);
  positions.add(`${guardY},${guardX}`);

  let directionIndex = 0;
  let direction = directions[directionIndex];

  let guardXNext = guardX + direction[1];
  let guardYNext = guardY + direction[0];

  while (
    guardXNext >= 0 &&
    guardXNext < map[0].length &&
    guardYNext >= 0 &&
    guardYNext < map.length
  ) {
    if (map[guardYNext][guardXNext] === '#') {
      // turn
      directionIndex = (directionIndex + 1) % directions.length;
      direction = directions[directionIndex];
    } else {
      // walk fwd
      guardY = guardYNext;
      guardX = guardXNext;
      positions.add(`${guardY},${guardX}`);
    }

    guardXNext = guardX + direction[1];
    guardYNext = guardY + direction[0];
  }

  return positions.size;
};

const part2 = (rawInput: string) => {
  const map = parseInput(rawInput);

  let loops = 0;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === '^' || map[y][x] === '#') {
        continue;
      }

      const modifiedMap = structuredClone(map);
      modifiedMap[y][x] = '#';

      let [guardX, guardY] = findGuard(modifiedMap);

      let directionIndex = 0;
      let direction = directions[directionIndex];

      const dirPos = directions.reduce<Record<number, Set<string>>>(
        (acc, _, i) => {
          acc[i] = new Set();
          return acc;
        },
        {},
      );

      dirPos[directionIndex].add(`${guardY},${guardX}`);

      let guardXNext = guardX + direction[1];
      let guardYNext = guardY + direction[0];

      while (
        guardXNext >= 0 &&
        guardXNext < modifiedMap[0].length &&
        guardYNext >= 0 &&
        guardYNext < modifiedMap.length
      ) {
        if (modifiedMap[guardYNext][guardXNext] === '#') {
          // turn
          directionIndex = (directionIndex + 1) % directions.length;
          direction = directions[directionIndex];
        } else {
          // walk fwd
          guardY = guardYNext;
          guardX = guardXNext;

          if (dirPos[directionIndex].has(`${guardY},${guardX}`)) {
            ++loops;
            break;
          }

          dirPos[directionIndex].add(`${guardY},${guardX}`);
        }

        guardXNext = guardX + direction[1];
        guardYNext = guardY + direction[0];
      }
    }
  }

  return loops;
};

run({
  part1: {
    tests: [
      {
        input: `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`,
        expected: 41,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
