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
* @param token Token of the client to use for the route request (required)
* @param id Id of the client to use for route request (required)
* @param settings Settings for the route request, permissions key will determine if the permissions should be set, guilds will determine the guild to update the command for
  **/
const route = (client, guild = undefined) => {
  return new Promise((resolve, reject) => {
    if (!client) return reject("No client object provided")
    var { token, application } = client
    var { id } = application
    if (!token) return reject("No token provided for the request")
    if (!id) return reject("No id provied for the request")
    if (!commands) return reject("No commands to route")

    const rest = new REST({ version: '9' }).setToken(token);
    
    var r = guild ? Routes.applicationGuildCommands(id, guild) : Routes.applicationCommands(id)

    const cmds = commands.map(cmd => {
      var c = cmd.command.toJSON()
      var meta = cmd.meta
      return Object.assign(c, meta)
    })
    rest.put(r, { body: cmds })
      .then((async cs => {

        for (var {id, guild_id} of cs) {
          if (!commands[id] || !commands[id].permissions) return
          var cm = (guild_id ? await client.guilds.cache.get(guild_id).commands.fetch(id) : await client.commands.fetch(id))
          await cm.permissions.add(commands[id].permissions)
        }

        resolve(cmds)
      }))
      .catch(reject);

  })
}

var permissions = (guild) => {
  return new Promise((res,rej) => {
    
  })
}

module.exports = { register, route, commands }