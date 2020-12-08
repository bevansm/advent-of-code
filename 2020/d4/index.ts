import fs from 'fs';
import path from 'path';

interface Passport {
  byr: string;
  iyr: string;
  eyr: string;
  hgt: string;
  hcl: string;
  ecl: string;
  pid: string;
  cid: string;
}

const input: Partial<Passport>[] = fs
  .readFileSync(path.join(__dirname, 'input.txt'))
  .toString()
  .split(/(\r\n){2}/)
  .map(v => v.trim())
  .filter(v => !!v)
  .map(p => {
    const byField = p
      .split(/[\n ]/)
      .map(v => v.trim())
      .filter(v => !!v)
      .sort();

    return byField.reduce((acc, v) => {
      const [key, val] = v.split(':');
      // @ts-ignore
      acc[key] = val;
      return acc;
    }, {});
  });

function hasPresent(p: Partial<Passport>) {
  const numKeys = Object.keys(p).length;
  return numKeys === 8 || (numKeys === 7 && !p.cid);
}

const eyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
function isValid(p: Partial<Passport>): boolean {
  const byr = parseInt(p.byr);
  if (isNaN(byr) || byr < 1920 || byr > 2002) return false;
  const iyr = parseInt(p.iyr);
  if (isNaN(iyr) || iyr < 2010 || iyr > 2020) return false;
  const eyr = parseInt(p.eyr);
  if (isNaN(eyr) || eyr < 2020 || eyr > 2030) return false;

  if (!p.hgt) return false;
  const [val, unit] = p.hgt.match(/(\d+)|(\D+)/g);
  const hgtVal = parseInt(val);
  if (
    !unit ||
    isNaN(hgtVal) ||
    !((unit === 'cm' && hgtVal >= 150 && hgtVal <= 193) || (unit === 'in' && hgtVal >= 59 && hgtVal <= 76))
  ) {
    return false;
  }

  if (!p.hcl || !/^#[a-f0-9]{6}$/.test(p.hcl)) return false;
  if (!eyeColors.includes(p.ecl)) return false;

  return !!p.pid && p.pid.length === 9 && !isNaN(parseInt(p.pid));
}

const countPresent = (ps: Partial<Passport>[]) => ps.reduce((acc, p) => acc + Number(hasPresent(p)), 0);
const countValid = (ps: Partial<Passport>[]) => ps.reduce((acc, p) => acc + Number(isValid(p)), 0);

console.log(countPresent(input));
console.log(countValid(input));
