import * as fs from "fs";
fs.readFile("./input.txt", { encoding: "utf-8" }, (err, data) => {
  if (err) {
    console.log(err);
  }
  function checkForPairs(input: string): boolean {
    for (let index = 0; index < input.length - 2; index++) {
      const query: string = input.slice(index, index + 2);
      if (input.slice(index + 2).includes(query)) {
        return true;
      }
    }
    return false;
  }
  //check for consecutive alphabets . if 0 characters which are consecutive , it's a bad word
  function checkConsecutiveAlphabets(input: string): boolean {
    for (let index = 0; index < input.length - 2; index++) {
      if (input[index] == input[index + 2]) {
        return true;
      }
    }
    return false;
  }
  let freq = 0;
  for (const word of data.trim().split("\n")) {
    if (!checkForPairs(word)) {
      continue;
    }
    if (!checkConsecutiveAlphabets(word)) {
      continue;
    }
    freq++;
  }
  console.log(`There are ${freq} nice words`);
});
