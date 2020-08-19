const got = require('got');
const url = 'https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json';
const userProfiles = require('./UserProfiles');

const CHILD_AGE_LIMIT = 10;

const getUsers = async () => {
  try {
    const response = await got(url);
    return JSON.parse(response.body);
  } catch (error) {
    throw new Error(error.response.body);
  }
};

const getUserByUsername = async (username) => {
  const users = await getUsers();
  const user = users.find((user) => user.username === username);
  if (!user) throw new Error(`Username ${username} doesnt exist.`);
  return user;
};

const yearsDifference = (dt2, dt1) => {
  let diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60 * 24;
  return Math.abs(Math.round(diff / 365.25));
};

const getBirthdateByUsername = async (username) => {
  try {
    const userInfo = await getUserByUsername(username);
    const profile = await userProfiles.getProfileByUid(userInfo.uid);
    return profile.birthdate;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const isRegistered = async (username) => {
  try {
    const users = await getUsers();
    return users.some((user) => user.username === username);
  } catch (err) {
    return false;
  }
};

const isChild = async (username) => {
  const birthdate = await getBirthdateByUsername(username);
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
