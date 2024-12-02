const fs = require("fs");

fs.readFile("sample1", "utf-8", (err, data) => {
  if (err) {
    console.log("Error reading file");
    return;
  }
  const arrSample = data.split(/\s+/).filter((item) => item !== "");
  const left = arrSample
    .filter((_, index) => index % 2 === 0)
    .map(Number)
    .sort((a, b) => a - b);
  const right = arrSample.filter((_, index) => index % 2 !== 0).map(Number);
  let similarityScore = 0;
  left.forEach((item) => {
    const frequency = right.filter((r) => r === item).length;
    similarityScore += item * frequency;
  });

  console.log("Similarity Score:", similarityScore);
});
