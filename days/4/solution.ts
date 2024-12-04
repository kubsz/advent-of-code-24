import { speedygonzalez } from '../utils';

import fs from 'fs';
import path from 'path';

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').toLowerCase();
const lines = input.split('\n').map((line) => line.trim());

// this solution relies on wordsearch being a square - lol
const WORD = 'xmas';
const GRID_SIDE_LENGTH = lines[0].length;

const variations = [
  { x: 0, y: 1 }, // right
  { x: 0, y: -1 }, // left
  { x: 1, y: 0 }, // down
  { x: -1, y: 0 }, // up
  { x: -1, y: -1 }, // up-left
  { x: -1, y: 1 }, // up-right
  { x: 1, y: -1 }, // down-left
  { x: 1, y: 1 }, // down-right
];

const wordExists = ({ x: moveX, y: moveY }, { x, y }) => {
  for (let charIndex = 0; charIndex < WORD.length; charIndex++) {
    const [xPos, yPos] = [x + charIndex * moveX, y + charIndex * moveY];

    // eliminate if either current row or current col is out of bounds
    const eliminations = [xPos < 0, yPos < 0, xPos >= GRID_SIDE_LENGTH, yPos >= GRID_SIDE_LENGTH];
    if (eliminations.some(Boolean)) {
      return false;
    }

    // latest char does not match
    if (lines[xPos][yPos] !== WORD[charIndex]) {
      return false;
    }
  }
  return true;
};

const entry = () => {
  let total = 0;

  for (let x = 0; x < GRID_SIDE_LENGTH; x++) {
    for (let y = 0; y < GRID_SIDE_LENGTH; y++) {
      for (const variation of variations) {
        wordExists(variation, { x, y }) && total++;
      }
    }
  }

  console.log(`total: ${total}`);
};

speedygonzalez(entry);
