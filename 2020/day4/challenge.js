const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8').split('\n');

function parsePassports() {
  const passports = [];
  let currentPassport = {};
  input.forEach(row => {
    const trimmedRow = row.trim();
    if (row === '') {
      passports.push(currentPassport)
      currentPassport = {};
    } else {
      trimmedRow.split(' ').forEach(field => {
        const splitField = field.split(':');
        currentPassport[splitField[0]] = splitField[1];
      });
    }
  });

  return passports;
}

function validYearField(field, startYear, endYear) {
  return field >= startYear && field <= endYear
}

function validHeightField(field) {
  const height = parseInt(field.replace('cm').replace('in'));
  if (field.includes('cm')) {
    return height >= 150 && height <= 193
  } else if (field.includes('in')) {
    return height >= 59 && height <= 76
  }

  return false;
}

function validHairField(field) {
  return RegExp('^#([0-9a-f]){6}$').test(field)
}

function validEyeField(field) {
  return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(field);
}

function validPassportId(field) {
  return RegExp('^[0-9]{9}$').test(field)
}

function validPassportSimple(passport) {
  const fields = Object.keys(passport);
  if (fields.length < 7) {
    return false;
  } else if (fields.length === 7 && fields.includes('cid')) {
    return false;
  }
  return true;
}

function validPassportExtended(passport) {
  const fields = Object.keys(passport);
  if (!validPassportSimple(passport)) {
    return false;
  } else if (!validYearField(passport.byr, 1920, 2002)) {
    return false;
  } else if (!validYearField(passport.iyr, 2010, 2020)) {
    return false;
  } else if (!validYearField(passport.eyr, 2020, 2030)) {
    return false;
  } else if (!validHeightField(passport.hgt)) {
    return false;
  } else if (!validHairField(passport.hcl)) {
    return false;
  } else if (!validEyeField(passport.ecl)) {
    return false;
  } else if (!validPassportId(passport.pid)) {
    return false;
  }


  return true;
}

let validPassports = 0;
parsePassports().forEach(passport => {
  if (validPassportSimple(passport)) {
    validPassports++;
  }
}) ;
console.log ('Challenge 1: ' + validPassports)

validPassports = 0;
parsePassports().forEach(passport => {
  if (validPassportExtended(passport)) {
    validPassports++;
  }
});
console.log ('Challenge 2: ' + validPassports)