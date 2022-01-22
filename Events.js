const {Collection} = require("discord.js")
var events = new Collection()
const register = (client, paths) => {
  return new Promise((resolve, reject) => {
    if (!paths) return reject("No paths given")
    for (var p of paths) {
      if (!p.endsWith(".js") && !p.endsWith(".ts") && !p.endsWith(".mjs") && !p.endsWith(".mts")) return reject("File path '" + p + "' is not a valid Java/TypeScript file")
      const prop = require(p)
      var evt = p.split(".")[0].split("/")
      evt = evt[evt.length-1]
      if (!prop) return reject("File path '" + p + "' is not a valid event prop")
      events.set(evt, prop)
      client.on(evt, prop.bind(null, client))
    }
    resolve(events)
  })
}

module.exports = {register, events}