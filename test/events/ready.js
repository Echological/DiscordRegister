const {Commands} = require("../../index.js")

module.exports = (client) => {
  Commands.route(client)
    .then(console.log)
    .catch(console.log)
}