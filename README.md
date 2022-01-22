# DiscordRegister

> A simple way to register event and command handlers with [discord.js](https://www.npmjs.com/package/discord.js)



## Commands

To register a command, you only need to do a few things

First is to setup a discord.js bot, which I will be referencing as `client`

Then, register the files you want to use as commands:
```js
const { Commands } = require("discord.js")
const fs = require("fs") // to read files
const path = require("path")

fs.readdir("dir/commands/", (e,f) => {
  if (e) return console.log(e)
  var m = f.map(f => path.join(__dirname,"commands",f))
  // get the directory to the files
  
  Commands.register(m) // register the commands
    .then(console.log) // returns the commands
    .catch(console.log) // check for errors
  
})
```

Then, once you have your commands registered, you must send them via rest:
```js
Commands.route(process.env.TOKEN, client.application.id)
  .then(console.log)
  .catch(console.log)
```
You should do this within your `client`'s `ready` event
(see #Events)

Note: To listen to the interactions of slash commands, look at the [interactionCreate Event](https://discord.js.org/#/docs/discord.js/stable/class/Client?scrollTo=e-interactionCreate)

Your command file does not have to be named anything specific, but inside of it you will need to do one thing

You will need to build a SlashCommand object using discord.js's builders

Example:
```js
const { SlashCommandBuilder } = require('@discordjs/builders'); // get the slash command builder

const command = new SlashCommandBuilder() // new slash command
  .setName("hi") // name of command
  .setDescription("O hi") // description of command

module.exports = { // export the command
  command,
}
```

As mentioned before, you can use the `interactionCreate` event to listen to the slash commands, and example of this follows:

(`interactionCreate.js` Event)
```js
const {Commands} = require("discordregister")

module.exports = (client, interaction) => {
  if (interaction.isCommand()) {
    let cmd = Commands.commands.get(interaction.commandName)

    if (!cmd) return

    await cmd.interact(client, interaction) // use the method from our command file
  } 
}
```

then, in your command file:

(`hi.js` Command)
```js
const { SlashCommandBuilder } = require('@discordjs/builders');

const command = new SlashCommandBuilder()
  .setName("hi")
  .setDescription("O hi")
  
module.exports = {
  command,
  interact: (client,interaction) => { // add the method to run when the command is sent
    interaction.reply("Hi!")
  }
}
```

## Events

For listening to commands, you can do a very similar thing as the Commands

Make sure you have your discord.js `client` setup

Then:
```js
const { Commands } = require("discord.js")
const fs = require("fs") // to read files
const path = require("path")

readdir("dir/events/", (e,f) => {
  if (e) return console.log(e)
  var m = f.map(f => path.join(__dirname,"events",f))
  // get the directory to the files 
  
  Events.register(client, m) // register events
    .then(console.log) // returns the events registered
    .catch(console.log) // check for errors
})
```

Then, name your event file according to the event

For example, if you want to listen to the `ready` event, name your file `ready.js`

In `ready.js`:
```js
module.exports = (client) => {
  console.log("Client is ready!")
}
```

The `client` argument will be passed first on all of the event handlers, then along with the parameters for the event from discord.js

## Example

An example can be found in the `test` directory