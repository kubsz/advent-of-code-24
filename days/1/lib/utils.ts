import fs from "fs";
import path from "path";

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
