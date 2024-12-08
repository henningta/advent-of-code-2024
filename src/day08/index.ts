import run from 'aocrunner';

type Coord = {
  x: number;
  y: number;
};

const parseInput = (rawInput: string) => {
  const lines = rawInput.split('\n');

  const coords = lines.reduce<Record<string, Set<Coord>>>((acc, line, y) => {
    line.split('').forEach((c, x) => {
      if (c === '.') {
        return;
      }

      if (!acc[c]) {
        acc[c] = new Set();
      }
      acc[c].add({ x, y });
    });
    return acc;
  }, {});

  return { coords, w: lines[0].length, h: lines.length };
};

const inBounds = (coord: Coord, w: number, h: number) =>
  coord.x >= 0 && coord.y >= 0 && coord.x < w && coord.y < h;

const getCoordKey = (coord: Coord) => `${coord.x},${coord.y}`;

const getAntinodesBasic = (c1: Coord, c2: Coord, w: number, h: number) =>
  new Set(
    [
      { x: c1.x + (c1.x - c2.x), y: c1.y + (c1.y - c2.y) },
      { x: c2.x + (c2.x - c1.x), y: c2.y + (c2.y - c1.y) },
    ]
      .filter((coord) => inBounds(coord, w, h))
      .map((coord) => getCoordKey(coord)),
  );

const getAntinodesHarmonic = (c1: Coord, c2: Coord, w: number, h: number) => {
  const diff: Coord = { x: c1.x - c2.x, y: c1.y - c2.y };

  let source = { ...c1 };
  let next = { ...source };
  let prev = { ...source };

  const antinodes = new Set([getCoordKey(source)]);

  let withinBounds = true;

  while (withinBounds) {
    withinBounds = false;

    next.x += diff.x;
    next.y += diff.y;

    if (inBounds(next, w, h)) {
      withinBounds = true;
      antinodes.add(getCoordKey(next));
    }

    prev.x -= diff.x;
    prev.y -= diff.y;

    if (inBounds(prev, w, h)) {
      withinBounds = true;
      antinodes.add(getCoordKey(prev));
    }
  }

  return antinodes;
};

const getAntinodesForMap = (
  coords: Record<string, Set<Coord>>,
  antinodeFunc: (c1: Coord, c2: Coord) => Set<string>,
) =>
  Object.values(coords).reduce<Set<string>>((acc, pairedCoords) => {
    const pairedCoordsArr = [...pairedCoords];
    pairedCoordsArr.forEach((c1, i) => {
      for (let j = i + 1; j < pairedCoordsArr.length; j++) {
        const c2 = pairedCoordsArr[j];
        acc = acc.union(antinodeFunc(c1, c2));
      }
    });
    return acc;
  }, new Set());

const part1 = (rawInput: string) => {
  const { coords, w, h } = parseInput(rawInput);

  const antinodes = getAntinodesForMap(coords, (c1, c2) =>
    getAntinodesBasic(c1, c2, w, h),
  );

  return antinodes.size;
};

const part2 = (rawInput: string) => {
  const { coords, w, h } = parseInput(rawInput);

  const antinodes = getAntinodesForMap(coords, (c1, c2) =>
    getAntinodesHarmonic(c1, c2, w, h),
  );

  return antinodes.size;
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
      {
        input: `T.........
...T......
.T........
..........
..........
..........
..........
..........
..........
..........
`,
        expected: 9,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
