import fs from "fs";
import path from "path";

import { speedygonzalez } from "../utils";

const LOCATION_IDS_FILE_PATH = path.join(__dirname, "location-ids.txt");

export const getLists = () => {
  const rawLocationIds = fs.readFileSync(LOCATION_IDS_FILE_PATH, "utf8");

  const lists: any = [[], []];

  const lines = rawLocationIds.split(/\n/);
  for (const line of lines) {
    const [num1, num2] = line.split(" ".repeat(3)).map(Number);
    lists[0].push(num1);
    lists[1].push(num2);
  }

  return lists.map((list: number[]) => list.sort());
};

const entry = () => {
  const [list1, list2] = getLists();

  if (list1.length !== list2.length) {
    throw new Error("Lists are different lengths, solution does not work");
  }

  const totalDistance = list1.reduce((acc, num1, i) => {
    return acc + Math.abs(num1 - list2[i]);
  }, 0);

  console.log(`accumulated distance: ${totalDistance}`);

  let [similarity, i, c] = [0, 0, 0];

  while (i < list1.length && c < list2.length) {
    if (list1[i] === list2[c]) {
      let matches = 1;

      while (c <= list2.length && list2[c + 1] === list1[i]) {
        matches++;
        c++;
      }

      similarity += list1[i] * matches;
      i++;
      c++;
      continue;
    }

    if (list1[i] > list2[c]) {
      c++;
      continue;
    }

    i++;
  }

  console.log(`similarity score: ${similarity}`);
};

speedygonzalez(entry);
