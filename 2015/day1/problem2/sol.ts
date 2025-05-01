import * as fs from "fs";

fs.readFile("./path", "utf-8", (err, data) => {
  let floor: number = 0;
  let count: number = 0;
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  for (const char of data.trim()) {
    count++;
    if (char == "(") {
      floor++;
    } else if (char == ")") {
      floor--;
    } else {
      console.log(char);
      console.log("Invalid path");
      return;
    }
    if (floor == -1) {
      console.log(count);
      break;
    }
  }
  console.log(floor);
});
