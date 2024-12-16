import run from 'aocrunner';

type RowConfig = {
  x: number;
  y: number;
};

type Row = {
  a: RowConfig;
  b: RowConfig;
  prize: RowConfig;
};

const solveSystem = (
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
  f: number,
) => {
  // Solve the system of equations:
  // ax + by = c
  // dx + ey = f

  let det = a * e - b * d;

  if (det === 0) {
    // The system has no unique solution
    if (c * e - b * f === 0 && a * f - c * d === 0) {
      return 'Infinite solutions';
    } else {
      return 'No solution';
    }
  } else {
    // The system has a unique solution
    let x = (c * e - b * f) / det;
    let y = (a * f - c * d) / det;
    return [x, y];
  }
};

const parseInput = (rawInput: string) =>
  rawInput
    .split('\n\n')
    .map((x) => x.split('\n').map((x) => x.split(',')))
    .reduce<Row[]>((acc, row) => {
      acc.push({
        a: {
          x: parseInt(row[0][0].split('+')[1]),
          y: parseInt(row[0][1].split('+')[1]),
        },
        b: {
          x: parseInt(row[1][0].split('+')[1]),
          y: parseInt(row[1][1].split('+')[1]),
        },
        prize: {
          x: parseInt(row[2][0].split('=')[1]),
          y: parseInt(row[2][1].split('=')[1]),
        },
      });
      return acc;
    }, []);

const part1 = (rawInput: string) => {
  const rows = parseInput(rawInput);

  return rows.reduce((acc, row) => {
    for (let i = 0; i < 100; i++) {
      let lowestCost = Infinity;

      const ax = row.a.x * i;
      const ay = row.a.y * i;

      for (let j = 0; j < 100; j++) {
        const bx = row.b.x * j;
        const by = row.b.y * j;

        if (ax + bx === row.prize.x && ay + by === row.prize.y) {
          // winner winner chicken dinner
          const cost = 3 * i + j;
          lowestCost = Math.min(cost, lowestCost);
        }
      }

      if (lowestCost !== Infinity) {
        acc += lowestCost;
      }
    }

    return acc;
  }, 0);
};

const part2 = (rawInput: string) => {
  const rows = parseInput(rawInput).map<Row>((row) => ({
    ...row,
    prize: {
      x: row.prize.x + 10000000000000,
      y: row.prize.y + 10000000000000,
    },
  }));

  return rows.reduce((acc, row) => {
    const solution = solveSystem(
      row.a.x,
      row.b.x,
      row.prize.x,
      row.a.y,
      row.b.y,
      row.prize.y,
    );

    if (typeof solution === 'string') {
      return acc;
    }

    if (solution.every((x) => Number.isInteger(x))) {
      acc += 3 * solution[0] + solution[1];
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
