const fs = require('fs');
const path = require('path');

const typeDefs = fs.readFileSync(path.resolve(__dirname, './schema.graphql'), { encoding: 'utf8' });

module.exports = typeDefs