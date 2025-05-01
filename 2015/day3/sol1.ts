import * as fs from "fs";

fs.readFile("./input.txt", { encoding: "utf-8" }, (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  let [x, y] = [0, 0];
  let houseVisits: { [key: string]: number } = {};
  houseVisits[`${x},${y}`] = 1;
  for (const char of data.trim()) {
    switch (char) {
      case ">":
        x++;
        break;
      case "<":
        x--;
        break;
      case "^":
        y++;
        break;
      case "v":
        y--;
        break;
    }
    const key = `${x},${y}`;
    houseVisits[key] = (houseVisits[key] || 0) + 1;
  }
  const housesVisitedMoreThanOnce = Object.values(houseVisits).filter(
    (visitCount) => visitCount >= 1,
  ).length;
  console.log(
    "Total number of houses visited more than once: ",
    housesVisitedMoreThanOnce,
  );
});
