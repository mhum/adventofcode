const fs = require('fs');

const input = fs.readFileSync('./challenge1Input.txt', 'utf8').split('\n').map(x => parseInt(x));

for (let x = 0; x < input.length - 1; x++) {
  for (let y = x + 1; y < input.length; y++) {
    if (input[x] + input[y] == 2020) {
      console.log(input[x] * input[y])
    }
  }
}

