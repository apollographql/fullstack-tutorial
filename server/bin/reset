#!/usr/bin/env node
const { createStore } = require('../src/utils');

const { db } = createStore();
db
  .sync({force: true})
  .then(() => {
    db.close();
  });
