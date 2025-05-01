import * as fs from "fs";

fs.readFile("./input.txt", { encoding: "utf-8" }, (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  let [xSanta, ySanta] = [0, 0];
  let [xAi, yAi] = [0, 0];
  const visitedHouse: { [key: string]: number } = {};
  visitedHouse["0,0"] = 2;
  for (const [index, char] of [...data].entries()) {
    if (index % 2 !== 0) {
      switch (char) {
        case ">":
          xSanta++;
          break;
        case "<":
          xSanta--;
          break;
        case "^":
          ySanta++;
          break;
        case "v":
          ySanta--;
          break;
      }
      const keySanta = `${xSanta},${ySanta}`;
      visitedHouse[keySanta] = (visitedHouse[keySanta] || 0) + 1;
    } else {
      switch (char) {
        case ">":
          xAi++;
          break;
        case "<":
          xAi--;
          break;
        case "^":
          yAi++;
          break;
        case "v":
          yAi--;
          break;
      }
      const keyAi = `${xAi},${yAi}`;
      visitedHouse[keyAi] = (visitedHouse[keyAi] || 0) + 1;
    }
  }
  console.log(
    Object.values(visitedHouse).filter((visitedCount) => visitedCount >= 1)
      .length,
  );
});
