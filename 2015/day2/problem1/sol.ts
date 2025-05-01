import * as fs from "fs";

fs.readFile("./input.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  let totalArea = data
    .trim()
    .split("\n")
    .map((d) => {
      const numberArray = d.match(/\d+/g);
      if (numberArray) {
        const l = parseInt(numberArray[0]);
        const w = parseInt(numberArray[1]);
        const h = parseInt(numberArray[2]);
        const surfaceArea = 2 * (l * w + w * h + h * l);
        const slack = Math.min(l * w, w * h, h * l);
        return surfaceArea + slack;
      }
      return 0;
    })
    .reduce((acc, area) => acc + area, 0);
  console.log(totalArea);
});
