import run from 'aocrunner';

type Block = {
  id?: number;
  index: number;
  length: number;
};

const range = (i: number) => [...Array(i).keys()];

const resizeArr = <T>(arr: T[], newSize: number, defaultValue: T) => [
  ...arr,
  ...Array<T>(Math.max(Math.floor(newSize - arr.length), 0)).fill(defaultValue),
];

const parseInput = (rawInput: string) => {
  return [...rawInput].reduce<{
    fileIds: (number | undefined)[];
    fileId: number;
  }>(
    (acc, c, i) => {
      const val = parseInt(c);
      const isFile = i % 2 === 0;

      if (isFile) {
        acc.fileIds.push(...range(val).map(() => acc.fileId));
        ++acc.fileId;
      } else {
        acc.fileIds.push(...range(val).map(() => undefined));
      }

      return acc;
    },
    { fileIds: [], fileId: 0 },
  ).fileIds;
};

const parseInput2 = (rawInput: string) => {
  return [...rawInput].reduce<{
    blocks: Block[];
    fileId: number;
    index: number;
  }>(
    (acc, c, i) => {
      const length = parseInt(c);
      const isFile = i % 2 === 0;

      acc.blocks.push({
        id: isFile ? acc.fileId : undefined,
        index: acc.index,
        length,
      });

      if (isFile) {
        ++acc.fileId;
      }

      acc.index += length;

      return acc;
    },
    { blocks: [], fileId: 0, index: 0 },
  ).blocks;
};

const calcChecksum = (fileIds: (number | undefined)[]) => {
  let sum = 0;
  for (let i = 0; i < fileIds.length; i++) {
    if (fileIds[i] === undefined) {
      break;
    }

    sum += i * fileIds[i]!;
  }

  return sum;
};

const part1 = (rawInput: string) => {
  const fileIds = parseInput(rawInput);

  let i = 0;
  let j = fileIds.length - 1;

  while (true) {
    while (fileIds[i] !== undefined) {
      ++i;
    }

    while (fileIds[j] === undefined) {
      --j;
    }

    if (i >= j) {
      break;
    }

    fileIds[i] = fileIds[j];
    fileIds[j] = undefined;
  }

  return calcChecksum(fileIds);
};

const part2 = (rawInput: string) => {
  const blocks = parseInput2(rawInput);

  console.log(blocks.slice(0, 100));

  for (let i = blocks.length - 1; i >= 0; i--) {
    const file = blocks[i];
    if (file.id === undefined) {
      // only process file blocks
      continue;
    }

    for (let j = 0; j < i; j++) {
      const empty = blocks[j];

      if (empty.index >= file.index) {
        break;
      }

      if (empty.id !== undefined || file.length > empty.length) {
        // only process empties w/ available space
        continue;
      }

      file.index = empty.index;
      empty.index += file.length;
      empty.length -= file.length;

      for (
        let k = j + 1;
        k < blocks.length && blocks[k].id === undefined;
        k++
      ) {
        const next = blocks[k];
        empty.length += next.length;
        next.length = 0;
      }

      break;
    }
  }

  console.log([...blocks].sort((a, b) => a.index - b.index).slice(0, 100));
  // console.log(blocks.slice(-100));

  // const fileIds = blocks
  //   .sort((a, b) => a.index - b.index)
  //   .reduce<(number | undefined)[]>((acc, block) => {
  //     if (block.id !== undefined) {
  //       acc.push(...range(block.length).map(() => block.id));
  //     }
  //     return acc;
  //   }, []);

  // console.log(fileIds.slice(1000));

  const fileIds = blocks
    .sort((a, b) => a.index - b.index)
    .reduce<(number | undefined)[]>(
      (acc, block) => {
        if (block.length === 0) {
          return acc;
        }

        if (block.index + block.length >= acc.length) {
          acc = resizeArr(acc, acc.length * 1.6, undefined);
        }

        range(block.length).forEach(
          (_, i) => (acc[block.index + i] = block.id),
        );
        return acc;
      },
      range(16).map(() => undefined),
    );

  console.log(fileIds.join());

  return calcChecksum(fileIds);
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
