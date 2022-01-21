const {Commands} = require("../../index.js")

module.exports = (client) => {
  Commands.route(process.env.TOKEN, client.application.id)
    .then(console.log)
    .catch(console.log)
  
}