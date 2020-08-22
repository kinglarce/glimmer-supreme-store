const fetch = require('node-fetch');
const url = 'https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json';
const userProfiles = require('./UserProfiles');

const CHILD_AGE_LIMIT = 10;

const getUsers = async () => {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    throw new Error(error)
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

const getUserProfileByUsername = async (username) => {
  try {
    const userInfo = await getUserByUsername(username);
    const profile = await userProfiles.getProfileByUid(userInfo.uid);
    return { ...userInfo, ...profile };
  } catch (error) {
    console.error(error);
    return null;
  }
};

const isRegistered = async (username) => {
  if (!username) return false;
  const users = await getUsers();
  return users.some((user) => user.username === username);
};

const isChild = async (username) => {
  if (!username) return false;
  const profile = await getUserProfileByUsername(username);
  if (!profile.birthdate) return false;
  const current = new Date();
  const parsedBirthdate = new Date(profile.birthdate);
  const years = yearsDifference(parsedBirthdate, current);
  return years && years < CHILD_AGE_LIMIT;
};

const save = (username, wish) => {
  return;
};

module.exports = {
  getUserProfileByUsername,
  isRegistered,
  isChild,
};
