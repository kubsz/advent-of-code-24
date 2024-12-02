import { speedygonzalez } from "../utils";
import { getLists } from "../1/lib/utils";

const entry = () => {
  const [list1, list2] = getLists();

  let similarity = 0;

  let i = 0;
  let c = 0;

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
