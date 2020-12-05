const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8').split('\n').map(x => {
  const split = x.trim().split(' ')
  return {
    min: split[0].split('-')[0],
    max: split[0].split('-')[1],
    letter: split[1].slice(0, -1),
    password: split[2],
  }
});

let meetsRequirements = 0;
input.forEach(entry => {
  const occurrences = entry.password.split(entry.letter).length - 1;
  if (entry.min <= occurrences && occurrences <= entry.max) {
    meetsRequirements++;
  }
});

console.log('Challenge 1: ' + meetsRequirements)

meetsRequirements = 0;
input.forEach(entry => {
  const matchFirst = entry.password.charAt(entry.min - 1) === entry.letter;
  const matchSecond = entry.password.charAt(entry.max - 1) === entry.letter;

  if ((matchFirst || matchSecond) && (matchFirst !== matchSecond)) {
    meetsRequirements++;
  }
});

console.log('Challenge 2: ' + meetsRequirements)