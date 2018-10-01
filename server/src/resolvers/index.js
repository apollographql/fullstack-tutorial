const mutation = require('./mutation');
const query = require('./query');

module.exports = { ...mutation, ...query };
