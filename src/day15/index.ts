import run from 'aocrunner';

const moves = ['^', '>', 'v', '<'] as const;
type Move = (typeof moves)[number];

const directions = {
  '^': [-1, 0], // up
  '>': [0, 1], // right
  v: [1, 0], // down
  '<': [0, -1], // left
};

const parseInput = (rawInput: string) => {
  const [top, bottom] = rawInput.split('\n\n');
  return {
    map: top.split('\n').map((x) => x.split('')),
    moves: bottom.split('\n').join('').split('') as Move[],
  };
};

const parseInput2 = (rawInput: string) => {
  const [top, bottom] = rawInput.split('\n\n');

  const map1 = top.split('\n').map((x) => x.split(''));
  const map = Array.from({ length: map1.length }).map((_, i) =>
    Array(map1[i].length * 2).fill('.'),
  );

  for (let y = 0; y < map1.length; y++) {
    for (let x = 0; x < map1[y].length; x++) {
      const node = map1[y][x];
      if (node === '.') {
        continue;
      }

      const x2 = x * 2;
      switch (node) {
        case '#':
          map[y][x2] = '#';
          map[y][x2 + 1] = '#';
          break;
        case 'O':
          map[y][x2] = '[';
          map[y][x2 + 1] = ']';
          break;
        case '@':
          map[y][x2] = '@';
          map[y][x2 + 1] = '.';
          break;
      }
    }
  }

  return {
    map,
    moves: bottom.split('\n').join('').split('') as Move[],
  };
};

const getRobotPos = (map: string[][]) => {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === '@') {
        return [y, x];
      }
    }
  }

  return [-1, -1];
};

const getMapScore = (map: string[][]) =>
  map.reduce(
    (acc, row, y) =>
      acc +
      row.reduce(
        (rowAcc, node, x) => rowAcc + (node === 'O' ? 100 * y + x : 0),
        0,
      ),
    0,
  );

const part1 = (rawInput: string) => {
  const { map, moves } = parseInput(rawInput);

  let [robotY, robotX] = getRobotPos(map);

  for (const move of moves) {
    const [dirY, dirX] = directions[move];
    const [nextY, nextX] = [robotY + dirY, robotX + dirX];

    const next = map[nextY][nextX];

    if (next === '#') {
      // robot hit a wall, do nothing
      // console.log(`\nMove ${move}:`);
      // console.log(map.map((x) => x.join('')).join('\n'));
      continue;
    } else if (next === '.') {
      // empty space, move robot
      map[robotY][robotX] = '.';
      robotY = nextY;
      robotX = nextX;
      map[robotY][robotX] = '@';
    } else if (next === 'O') {
      // robot hit a box, try to push all connected boxes to next available empty space
      let boxes = 1;
      let canPush = false;
      let [nextNextY, nextNextX] = [nextY + dirY, nextX + dirX];

      while (true) {
        let nextNext = map[nextNextY][nextNextX];

        if (nextNext === '#') {
          // can't push boxes, wall in the way, do nothing
          break;
        } else if (nextNext === '.') {
          // empty space available, push boxes and move robot
          canPush = true;
          break;
        } else if (nextNext === 'O') {
          // add box to chain of boxes to be pushed
          ++boxes;
        }

        nextNextX += dirX;
        nextNextY += dirY;
      }

      if (canPush) {
        // move robot
        map[robotY][robotX] = '.';
        robotY = nextY;
        robotX = nextX;
        map[robotY][robotX] = '@';

        // push all boxes
        let [nextBoxY, nextBoxX] = [robotY + dirY, robotX + dirX];
        for (let i = 0; i < boxes; i++) {
          map[nextBoxY][nextBoxX] = 'O';
          nextBoxY += dirY;
          nextBoxX += dirX;
        }
      }
    }

    // console.log(`\nMove ${move}:`);
    // console.log(map.map((x) => x.join('')).join('\n'));
  }

  // console.log(map.map((x) => x.join('')).join('\n'));

  return getMapScore(map);
};

const part2 = (rawInput: string) => {
  const { map, moves } = parseInput2(rawInput);

  let [robotY, robotX] = getRobotPos(map);

  for (const move of moves) {
    const [dirY, dirX] = directions[move];
    const [nextY, nextX] = [robotY + dirY, robotX + dirX];

    const next = map[nextY][nextX];

    if (next === '#') {
      // robot hit a wall, do nothing
      // console.log(`\nMove ${move}:`);
      // console.log(map.map((x) => x.join('')).join('\n'));
      continue;
    } else if (next === '.') {
      // empty space, move robot
      map[robotY][robotX] = '.';
      robotY = nextY;
      robotX = nextX;
      map[robotY][robotX] = '@';
    } else if (next === 'O') {
      // robot hit a box, try to push all connected boxes to next available empty space
      let boxes = 1;
      let canPush = false;
      let [nextNextY, nextNextX] = [nextY + dirY, nextX + dirX];

      while (true) {
        let nextNext = map[nextNextY][nextNextX];

        if (nextNext === '#') {
          // can't push boxes, wall in the way, do nothing
          break;
        } else if (nextNext === '.') {
          // empty space available, push boxes and move robot
          canPush = true;
          break;
        } else if (nextNext === 'O') {
          // add box to chain of boxes to be pushed
          ++boxes;
        }

        nextNextX += dirX;
        nextNextY += dirY;
      }

      if (canPush) {
        // move robot
        map[robotY][robotX] = '.';
        robotY = nextY;
        robotX = nextX;
        map[robotY][robotX] = '@';

        // push all boxes
        let [nextBoxY, nextBoxX] = [robotY + dirY, robotX + dirX];
        for (let i = 0; i < boxes; i++) {
          map[nextBoxY][nextBoxX] = 'O';
          nextBoxY += dirY;
          nextBoxX += dirX;
        }
      }
    }

    // console.log(`\nMove ${move}:`);
    // console.log(map.map((x) => x.join('')).join('\n'));
  }

  // console.log(map.map((x) => x.join('')).join('\n'));

  return getMapScore(map);
};

run({
  part1: {
    tests: [
      {
        input: `########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>>vv<v>>v<<`,
        expected: 2028,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `#######
#...#.#
#.....#
#..OO@#
#..O..#
#.....#
#######

<vv<<^^<<^^`,
        expected: 2028,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
