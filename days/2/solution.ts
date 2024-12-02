import { speedygonzalez } from "../utils";
import { getLists } from "../1/lib/utils";

const entry = () => {
  // already sorted ascending
  const [list1, list2] = getLists();

  let similarity = 0;

  for (let i = 0; i < list1.length; i++) {
    let matches = 0;

    for (let c = 0; c < list2.length; c++) {
      if (list2[c] > list1[i]) break;

      if (list2[c] === list1[i]) {
        // list2.splice(c, 1);
        // c--;
        matches++;
      }
    }

    similarity += list1[i] * matches;
  }

  console.log(`similarity score: ${similarity}`);
};

speedygonzalez(entry);
