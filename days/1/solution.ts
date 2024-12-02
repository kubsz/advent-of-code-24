import { speedygonzalez } from "../utils";
import { getLists } from "./lib/utils";

const entry = () => {
  const [list1, list2] = getLists();

  if (list1.length !== list2.length) {
    throw new Error("Lists are different lengths, solution does not work");
  }

  const totalDistance = list1.reduce((acc, num1, i) => {
    return acc + Math.abs(num1 - list2[i]);
  }, 0);

  console.log(`accumulated distance: ${totalDistance}`);
};

speedygonzalez(entry);
