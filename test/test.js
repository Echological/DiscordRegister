const {Commands,Events} = require("../index.js")
const {Client,Intents} = require("discord.js")
const {FLAGS} = Intents
const client = new Client({intents: Object.values(FLAGS)})

const {readdir} = require("fs")

readdir("test/events/", (e,f) => {
  if (e) return console.log(e)
  var m = f.map(f => __dirname+"/events/"+f)
  Events.register(client, ...m)
    .then(console.log)
    .catch(console.log)
})

readdir("test/commands/", (e,f) => {
  if (e) return console.log(e)
  var m = f.map(f => __dirname+"/commands/"+f)
  Commands.register(...m)
    .then(console.log)
    .catch(console.log)
})

client.login(process.env.TOKEN)