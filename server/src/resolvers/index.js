const mutation = require('./mutation');
const query = require('./query');
const user = require('./user');

module.exports = { ...mutation, ...query, ...user };
