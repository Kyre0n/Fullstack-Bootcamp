require('dotenv').config()
const { MONGODB_URI, MONGODB_URI_TEST, NODE_ENV, PORT } = process.env

const CONNECTION_STRING = NODE_ENV === 'test'
  ? MONGODB_URI_TEST
  : MONGODB_URI

module.exports = {
  CONNECTION_STRING,
  PORT
}
