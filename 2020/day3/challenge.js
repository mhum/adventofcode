const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8').split('\n').map(x => {
  return x.split('');
});

function countTrees(right, down) {
  let trees = 0;
  let columnTotal = right
  for (let i = down; i < input.length; i += down) {
    const row = input[i];
    const column = (columnTotal % input[0].length -1) + 1;

    if (row[column] === '#') {
      trees++;
    }
    columnTotal += right;
  }

  return trees;
}


console.log('Challenge 1: ' + countTrees(3, 1));

const paths = [[1,1], [3,1], [5,1], [7,1], [1,2]]
console.log('Challenge 2: ' + paths.reduce((total, path) => {
  return countTrees(path[0], path[1]) * total
}, 1));