const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8').split('\n');

let group = 1;
let answers = {
  1: {}
};
input.forEach(line => {
  const trimmedLine = line.trim();
  if (trimmedLine === "") {
    group++;
    answers[group] = {};
  } else {
    trimmedLine.split('').forEach(answer => {
      answers[group][answer] = 1;
    })
  }
});

let totalAnswers = 0;
for (const [group, groupAnswers] of Object.entries(answers)) {
  totalAnswers += Object.entries(groupAnswers).length;
}

console.log('Challenge 1: ' + totalAnswers);

group = 1;
answers = {
  1: {
    peopleInGroup: 0,
    groupAnswers: {}
  }
};
let peopleInGroup = 0;
input.forEach(line => {
  const trimmedLine = line.trim();
  if (trimmedLine === "") {
    group++;
    peopleInGroup = 0;
    answers[group] = {
      peopleInGroup: 0,
      groupAnswers: {}
    };
  } else {
    answers[group].peopleInGroup += 1;
    trimmedLine.split('').forEach(answer => {
      if (answers[group].groupAnswers[answer]) {
        answers[group].groupAnswers[answer] += 1;
      } else {
        answers[group].groupAnswers[answer] = 1;
      }
    })
  }
});

totalAnswers = 0;
Object.keys(answers).forEach(group => {
  const groupInfo = answers[group];

  for (const [question, answerCount] of Object.entries(groupInfo.groupAnswers)) {
    if (groupInfo.peopleInGroup === answerCount) {
      totalAnswers++;
    }
  }
});


console.log('Challenge 2: ' + totalAnswers);