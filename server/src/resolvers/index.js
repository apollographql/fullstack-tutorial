const mutation = require('./mutation');
const query = require('./query');
const user = require('./user');
const launch = require('./launch');

module.exports = { ...mutation, ...query, ...user, ...launch };
