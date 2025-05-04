import { argv } from "node:process";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, "..", ".env") });
(async () => {
  const day = argv[2];
  const year = argv[3];
  const session = process.env.AOC_SESSION;

  const dir = path.join(__dirname, `day${day}`);
  const questionUrl = `https://adventofcode.com/${year}/day/${day}`;
  const inputUrl = `https://adventofcode.com/${year}/day/${day}/input`; // Actual input URL

  try {
    fs.mkdirSync(dir, { recursive: true });
    console.log("Directory created.");

    fs.writeFileSync(path.join(dir, "input.txt"), "");
    fs.writeFileSync(path.join(dir, "question.md"), "");
    fs.writeFileSync(path.join(dir, "sol1.ts"), "");
    fs.writeFileSync(path.join(dir, "sol2.ts"), "");
    console.log("Files created.");
  } catch (err) {
    console.error("File creation error:", err);
    process.exit(1);
  }
  const resQuestion = await fetch(questionUrl, {
    headers: {
      cookie: `session=${session}`,
      "user-agent": "github.com/devnchill by you@example.com",
    },
  });

  if (!resQuestion.ok) {
    console.error("Failed to fetch AoC question page:", resQuestion.status);
    process.exit(1);
  }
  const html = await resQuestion.text();
  const $ = require("cheerio").load(html);
  const questionText = $("article.day-desc").first().text().trim();
  const resInput = await fetch(inputUrl, {
    headers: {
      cookie: `session=${session}`,
      "user-agent": "github.com/devnchill by you@example.com",
    },
  });

  if (!resInput.ok) {
    console.error("Failed to fetch AoC input page:", resInput.status);
    process.exit(1);
  }
  const input = await resInput.text();
  fs.writeFileSync(path.join(dir, "question.txt"), questionText);
  fs.writeFileSync(path.join(dir, "input.txt"), input);

  console.log("Question and input saved.");
})();
