const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8').split('\n').map(x => parseInt(x));

for (let x = 0; x < input.length - 1; x++) {
  for (let y = x + 1; y < input.length; y++) {
    if (input[x] + input[y] == 2020) {
      console.log("Challenge 1: " + input[x] * input[y])
    }
  }
}

for (let x = 0; x < input.length - 2; x++) {
  for (let y = x + 1; y < input.length; y++) {
    for (let z = y + 1; z < input.length; z++) {
      if (input[x] + input[y] + input[z] == 2020) {
        console.log("Challenge 1: " + input[x] * input[y] * input[z])
      }
    }
  }
}