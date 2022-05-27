const { Collection } = require("discord.js")
const { REST } = require('@discordjs/rest'),
  { Routes } = require('discord-api-types/v9')

const commands = new Collection()



const register = (...paths) => {
  return new Promise((resolve, reject) => {
    if (!paths) return reject("No paths given")
    for (var p of paths) {
      if (!p.endsWith(".js") && !p.endsWith(".ts")) return reject("File path '" + p + "' is not a valid Java/TypeScript file")
      var prop = require(p)
      if (!prop || !prop.command) return reject("File path '" + p + "' is not a valid command prop")
      commands.set(prop.command.name, prop)
    }
    resolve(commands)
  })
  // registers multiple command files from paths
}

/**
* @param client Discord client
* @param guild Guild resolvable 
  **/
const route = async (client, guild) => {

  const rest = new REST({ version: '9' }).setToken(client.token);

  const body = commands.map(cmd => {
    var c = cmd.command.toJSON()
    var meta = cmd.meta
    return Object.assign(c, meta)
  })

  return rest.put(
    Routes.applicationGuildCommands(client.user.id, guild),
    { 
      body
    }
  )

}

module.exports = { register, route, commands }