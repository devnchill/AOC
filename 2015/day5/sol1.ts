import * as fs from "fs";
fs.readFile("./input.txt", { encoding: "utf-8" }, (err, data) => {
  if (err) {
    console.log(err);
  }
  // first create a funciton which would check if any 2 adjacent alphabets are 'ab' or 'cd' or 'pq' or 'xy' . if it does , it's a bad word
  function checkAdjacentAlphabets(input: string): boolean {
    const keyWords = ["ab", "cd", "pq", "xy"];
    for (const k of keyWords) {
      if (input.includes(k)) {
        return true;
      }
    }
    return false;
  }
  //check for consecutive alphabets . if 0 characters which are consecutive , it's a bad word
  function checkConsecutiveAlphabets(input: string): boolean {
    for (let index = 0; index < input.length - 1; index++) {
      if (input[index] == input[index + 1]) {
        return true;
      }
    }
    return false;
  }
  //check if contains atleast 3 vowels. if it does , it's a good word
  function minimum3Vowels(input: string): boolean {
    const vowels = ["a", "e", "i", "o", "u"];
    const count = [...input].filter((char) => vowels.includes(char)).length;
    return count >= 3 ? true : false;
  }
  let freq = 0;
  for (const word of data.trim().split("\n")) {
    if (checkAdjacentAlphabets(word)) {
      continue;
    }
    if (!checkConsecutiveAlphabets(word)) {
      continue;
    }
    if (minimum3Vowels(word)) {
      freq++;
    }
  }
  console.log(`There are ${freq} nice words`);
});
