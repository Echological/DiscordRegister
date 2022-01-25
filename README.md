# DiscordRegister

> A simple way to register event and command handlers with [discord.js](https://www.npmjs.com/package/discord.js)

## Commands

To register a command, you only need to do a few things

To simply register a command from a file path:
```js
const { Commands } = require("discordregister")

Commands.register("path/to/file")
```

Then,
```js
Commands.route(client)
```

### Expanded Usage

First is to setup a discord.js bot, which I will be referencing as `client`

Then, register the files you want to use as commands:
```js
const { Commands } = require("discordregister")
const fs = require("fs") // to read files
const path = require("path")

fs.readdir("dir/commands/", (e,f) => {
  if (e) return console.log(e)
  var m = f.map(f => path.join(__dirname,"commands",f))
  // get the directory to the files
  
  Commands.register(...m) // register the commands
    .then(console.log) // returns the commands
    .catch(console.log) // check for errors
  
})
```

Then, once you have your commands registered, you must send them via rest:
```js
Commands.route(client) // replace TOKEN with your bot's token
  .then(console.log)
  .catch(console.log)
```
This takes in the `client`, to obtain the token and application id

You can also pass a second `guild` parameter, to specify a guild to register commands for

You should do this within your `client`'s `ready` event
(see [Events](#Events))

### Command File

> Note: To listen to the interactions of slash commands, look at the [interactionCreate Event](https://discord.js.org/#/docs/discord.js/stable/class/Client?scrollTo=e-interactionCreate)

Your command file does not have to be named anything specific, but inside of it you will need to build a SlashCommand object using [discord.js's builders](https://discord.js.org/docs/builders#/docs/builders/stable/general/welcome)

Example of Command:
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

So, if we have the following Command file:
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

We want to access the `interact()` method in our event, we can by accessing the saved export object in the commands Collection

Then in our `interactionCreate.js` [event file](#Events):
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

Then done, that's how you setup and listen to commands 

## Events

For listening to events, you can do a very similar thing as the Commands

To simply register an event from a file path:
```js
const { Events } = require("discordregister")

Events.register(client, "path/to/file")
```

This takes in your `client` in order to handle the event listeners with the export method in your file

### Expanded Usage

Make sure you have your discord.js `client` setup

Then, go ahead and go through the files you want to register:
```js
const { Events } = require("discordregister")
const fs = require("fs") // to read files
const path = require("path")

fs.readdir("dir/events/", (e,f) => {
  if (e) return console.log(e)
  var m = f.map(f => path.join(__dirname,"events",f))
  // get the directory to the files 
  
  Events.register(client, ...m) // register events
    .then(console.log) // returns the events registered
    .catch(console.log) // check for errors
})
```

Then, you will have to name your event file according to the event

For example, if you want to listen to the [`ready`](https://discord.js.org/#/docs/discord.js/stable/class/Client?scrollTo=e-ready) event, name your file `ready.js` (or `ready.ts`)

In `ready.js` file:
```js
module.exports = (client) => {
  console.log("Client is ready!")
}
```

The `client` argument will be passed first on all of the event handlers, then along with the parameters for the event from discord.js

## Example

An example can be found in the [/test/](https://github.com/Echological/DiscordRegister/tree/main/test) directory and also at [here](https://replit.com/@Echology/Discordjs-Template/)