const fs = require('fs');
const path = require('path');
let userProfilesFilePath = path.join(__dirname, '../data/userProfiles.json');
let userProfilesFile = fs.readFileSync(userProfilesFilePath);
let userProfiles = JSON.parse(userProfilesFile);

const getProfile = (uid) => userProfiles.find((profile) => profile.userUid === uid);

module.exports = {
  getProfile
};
