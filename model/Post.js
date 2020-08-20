const users = require('./Users');
let pendingWishes = [];

const save = async (params) => {
  const { username, wish } = params;
  const { address } = await users.getUserProfileByUsername(username);
  const data = { username, address, wish };
  pendingWishes.push(data);
};

module.exports = {
  save,
};
