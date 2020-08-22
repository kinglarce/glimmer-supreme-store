const users = require('./Users');
let wishes = [];

const pop = () => wishes.shift();

const save = async (params) => {
  const { username, wish } = params;
  const { address } = await users.getUserProfileByUsername(username);
  const data = { username, address, wish, created_date: new Date() };
  wishes.push(data);
};

module.exports = {
  save,
  pop,
};
