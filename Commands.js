const { Collection } = require("discord.js")
const { REST } = require('@discordjs/rest'),
  { Routes } = require('discord-api-types/v9')

const commands = new Collection()



const register = (paths) => {
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
* @param token Token of the client to use for the route request (required)
* @param id Id of the client to use for route request (required)
* @param settings Settings for the route request, permissions key will determine if the permissions should be set, guilds will determine the guild to update the command for
  **/
const route = (token, id, guild = undefined) => {
  return new Promise((resolve, reject) => {

    if (!token) return reject("No token provided for the request")
    if (!id) return reject("No id provied for the request")
    if (!commands) return reject("No commands to route")

    const rest = new REST({ version: '9' }).setToken(token);
    var r
    if (guild) {
      r = Routes.applicationGuildCommands(id, guild)
    } else {
      r = Routes.applicationCommands(id)
    }

    const cmds = commands.map(cmd => cmd.command.toJSON())

    rest.put(r, { body: cmds })
      .then(resolve)
      .catch(reject);

  })
}

module.exports = { register, route, commands }