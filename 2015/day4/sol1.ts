import { createHash } from "crypto";
import * as fs from "fs";

fs.readFile("./input.txt", { encoding: "utf-8" }, (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  const secretKey = data.trim();
  let number = 1;

  while (true) {
    const input = secretKey + number;
    const hash = createHash("md5").update(input).digest("hex");

    if (hash.startsWith("00000")) {
      console.log(`Found it! Number: ${number}`);
      console.log(`Hash: ${hash}`);
      break;
    }

    number++;
  }
});
