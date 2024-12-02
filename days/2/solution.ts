import fs from "fs";
import path from "path";
import { speedygonzalez } from "../utils";

const LEVELS_FILE_PATH = path.join(__dirname, "levels.txt");

const theresLevelsToit = () => {
  const rawFile = fs.readFileSync(LEVELS_FILE_PATH, "utf8");
  return rawFile.split(/\n/).map((line) => line.split(" ").map(Number));
};

const createSafeChecker = (allowMisplacements = 0) => {
  const check = (nums: number[], direction = undefined) => {
    if (nums.length === 1) return true;

    const [num1, num2, ...remaining] = nums;
    const diff = num2 - num1;

    if (!direction) {
      if (diff === 0) return false;
      direction = diff > 0 ? "+" : "-";
    }

    if (Math.abs(diff) > 3) return false;

    if ((direction === "+" && diff <= 0) || (direction === "-" && diff >= 0)) {
      return false;
    }

    return check([num2, ...remaining], direction);
  };

  const checkWithExceptions = (nums: number[]) => {
    if (check(nums)) return true;

    for (let i = 0; i < nums.length; i++) {
      const newVariation = nums.slice(0, i).concat(nums.slice(i + 1));
      if (check(newVariation)) return true;
    }

    return false;
  };

  return allowMisplacements > 0 ? checkWithExceptions : check;
};

const entry = () => {
  const levels = theresLevelsToit();
  let [safe1, safe2] = [0, 0];

  for (const level of levels) {
    const isSafe = createSafeChecker();
    if (isSafe(level)) {
      safe1++;
    }
  }

  for (const level of levels) {
    const isSafe = createSafeChecker(1);
    if (isSafe(level)) {
      safe2++;
    }
  }

  console.log(`safe1 levels: ${safe1}`);
  console.log(`safe2 levels: ${safe2}`);
};

speedygonzalez(entry);
