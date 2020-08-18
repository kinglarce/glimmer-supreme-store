const fs = require('fs');
const path = require('path');
let usersFilePath = path.join(__dirname, '../data/users.json');
let usersFile = fs.readFileSync(usersFilePath);
let users = JSON.parse(usersFile);
let userProfiles = require('./UserProfiles');

const CHILD_AGE_LIMIT = 10;

const yearsDifference = (dt2, dt1) => {
  let diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60 * 24;
  return Math.abs(Math.round(diff / 365.25));
};

const getBirthdateByUsername = (username) => {
  const userInfo = users.find((user) => user.username === username);
  if (!userInfo) return;
  const profile = userProfiles.getProfile(userInfo.uid);
  if (!profile) return;
  return profile.birthdate;
};

const isRegistered = (username) => users.some((user) => user.username === username);

const isChild = (username) => {
  const birthdate = getBirthdateByUsername(username);
  if (!birthdate) return false;
  const current = new Date();
  const parseBirthdate = new Date(birthdate);
  const years = yearsDifference(parseBirthdate, current);
  return years && years < CHILD_AGE_LIMIT;
};

module.exports = {
  isRegistered,
  isChild,
};
