const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8').split('\n');
const totalRows = 127;
const totalColumns = 7;

function findPlace(searchString, start, end) {
  if (searchString.length === 1) {
    if (searchString === 'F' || searchString === 'L') {
      return start;
    } else {
      return end;
    }
  }

  if (searchString.charAt(0) === 'F' || searchString.charAt(0) === 'L') {
    return findPlace(searchString.slice(1), start, Math.floor((start + end) / 2))
  } else {
    return findPlace(searchString.slice(1), Math.floor((start + end) / 2) + 1, end)
  }
}

let maxSeatID = 0
input.forEach(ticket => {
  const row = findPlace(ticket.slice(0,7), 0, totalRows);
  const column = findPlace(ticket.slice(7), 0, totalColumns);

  maxSeatID = Math.max(maxSeatID, row * 8 + column)
})
console.log('Challenge 1: ' + maxSeatID);

const seats = {};
[...Array(128).keys()].forEach(row => {
  seats[row] = [];
});
input.forEach(ticket => {
  const row = findPlace(ticket.slice(0,7), 0, totalRows);
  const column = findPlace(ticket.slice(7), 0, totalColumns);

  seats[row].push(column);
})

let mySeat = 0;
for (const [key, value] of Object.entries(seats)) {
  if (value.length === 7) {
    const possibleSeats = [0,1,2,3,4,5,6,7];
    possibleSeats.forEach(seat => {
      if (!value.includes(seat)) {
        mySeat = key * 8 + seat;
        return;
      }
    })
  }
}
console.log('Challenge 2: ' + mySeat);