const fetch = require('node-fetch');
const url = 'https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json';

const getProfiles = async () => {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    throw new Error(error);
  }
};

const getProfileByUid = async (uid) => {
  const profiles = await getProfiles();
  const profile = profiles.find((profile) => profile.userUid === uid);
  if (!profile) throw new Error(`User profile UID ${uid} doesnt exist.`);
  return profile;
};

module.exports = {
  getProfileByUid,
};
