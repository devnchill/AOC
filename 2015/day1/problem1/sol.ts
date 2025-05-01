import * as fs from "fs";

fs.readFile("./path", "utf-8", (err, data) => {
  let floor: number = 0;
  if (err) {
    throw Error;
  }
  for (const char of data.trim()) {
    if (char == "(") {
      floor++;
    } else if (char == ")") {
      floor--;
    } else {
      return char;
    }
  }
  return floor;
});
