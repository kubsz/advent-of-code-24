import { speedygonzalez } from "../utils";

import fs from "fs";
import path from "path";

const parseMemory = (input, useCommands = false) => {
  const splitByStart = input.split("mul(");

  let [total, enabled] = [0, true];

  for (const split of splitByStart) {
    const index = split.indexOf(")");

    if (enabled && index > -1) {
      const text = split.slice(0, index);
      const splitByComma = text.split(",").map(Number);

      if (splitByComma.length === 2 && !splitByComma.some(isNaN)) {
        total += splitByComma[0] * splitByComma[1];
      }
    }

    if (!useCommands) continue;

    const doIndex = split.lastIndexOf("do()");
    const dontIndex = split.lastIndexOf("don't()");

    if (doIndex > -1 || dontIndex > -1) {
      enabled = doIndex > dontIndex;
    }
  }
  return total;
};

const entry = () => {
  const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

  const total = parseMemory(input);
  const totalWithCommands = parseMemory(input, true);

  console.log(`total without commands: ${total}`);
  console.log(`total with commands: ${totalWithCommands}`);
};

speedygonzalez(entry);
