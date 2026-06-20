const config = require('./utils/config')
const app = require('./app')

const PORT = config.PORT
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
module.exports = { app, server }
