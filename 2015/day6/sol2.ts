import * as fs from "fs";

fs.readFile("./input.txt", { encoding: "utf-8" }, (err, data) => {
  if (err) console.log(err);

  const grid = Array.from({ length: 1000 }, () =>
    Array.from({ length: 1000 }, () => {
      return { brightness: 0 };
    }),
  );

  const instructions = data.split("\n");
  for (const i of instructions) {
    const match = i.match(
      /(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/,
    );
    if (match) {
      const [_, kw, x1, y1, x3, y3] = match;
      const x1Num = parseInt(x1);
      const y1Num = parseInt(y1);
      const x3Num = parseInt(x3);
      const y3Num = parseInt(y3);

      for (let x = x1Num; x <= x3Num; x++) {
        for (let y = y1Num; y <= y3Num; y++) {
          if (kw.includes("on")) {
            grid[x][y].brightness += 1;
          } else if (kw.includes("off")) {
            const cell = grid[x][y];
            if (cell.brightness >= 1) {
              cell.brightness--;
            }
          } else if (kw.includes("toggle")) {
            grid[x][y].brightness += 2;
          }
        }
      }
    }
  }
  console.log(
    "Total brightness is",
    grid.flat().reduce((total, current) => total + current.brightness, 0),
  );
});
