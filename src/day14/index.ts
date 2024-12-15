import run from 'aocrunner';
import fs from 'fs';
import path from 'path';

const mod = (a: number, b: number) => ((a % b) + b) % b;

const parseInput = (rawInput: string) =>
  rawInput
    .split('\n')
    .map((line) => line.split(' '))
    .map((x) => x.map((y) => y.split('=')))
    .map((x) => x.map((y) => y[1].split(',').map((z) => parseInt(z))));

const getQuadrant = (x: number, y: number, width: number, height: number) => {
  const midX = Math.floor(width / 2);
  const midY = Math.floor(height / 2);

  return x < midX
    ? y < midY
      ? 0
      : y > midY
        ? 1
        : undefined
    : x > midX
      ? y < midY
        ? 2
        : y > midY
          ? 3
          : undefined
      : undefined;
};

const getQuadrantScore = (
  robots: number[][][],
  width: number,
  height: number,
) => {
  const quadrants = robots.reduce<Record<number, number>>(
    (acc, [pos]) => {
      const quadrant = getQuadrant(pos[0], pos[1], width, height);
      if (quadrant !== undefined) {
        ++acc[quadrant];
      }
      return acc;
    },
    { 0: 0, 1: 0, 2: 0, 3: 0 },
  );

  const counts = Object.values(quadrants);
  return counts.slice(1).reduce((acc, count) => (acc *= count), counts[0]);
};

const part1 = (rawInput: string) => {
  const robots = parseInput(rawInput);

  const width = 101;
  const height = 103;

  for (let i = 0; i < 100; i++) {
    for (const [pos, vel] of robots) {
      pos[0] = mod(pos[0] + vel[0], width);
      pos[1] = mod(pos[1] + vel[1], height);
    }
  }

  return getQuadrantScore(robots, width, height);
};

const part2 = (rawInput: string) => {
  const robots = parseInput(rawInput);

  const width = 101;
  const height = 103;

  let lowestScore = Infinity;
  let ticks = 0;

  for (let i = 0; i < 101 * 103; i++) {
    for (const [pos, vel] of robots) {
      pos[0] = mod(pos[0] + vel[0], width);
      pos[1] = mod(pos[1] + vel[1], height);
    }

    const score = getQuadrantScore(robots, width, height);
    if (score < lowestScore) {
      lowestScore = score;
      ticks = i + 1;
    }
  }

  return ticks;
};

run({
  part1: {
    tests: [
      //       {
      //         input: `p=0,4 v=3,-3
      // p=6,3 v=-1,-3
      // p=10,3 v=-1,2
      // p=2,0 v=2,-1
      // p=0,0 v=1,3
      // p=3,0 v=-2,-2
      // p=7,6 v=-1,-3
      // p=3,0 v=-1,-2
      // p=9,3 v=2,3
      // p=7,3 v=-1,2
      // p=2,4 v=2,-3
      // p=9,5 v=-3,-3`,
      //         expected: 12,
      //       },
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
