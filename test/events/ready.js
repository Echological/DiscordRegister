const {Commands} = require("../../index.js")

module.exports = async(client) => {

  console.log("Logged in as "+client.user.tag)

  client.guilds.cache.each(async g => {

    Commands.route(client, g.id)
    
  })

}