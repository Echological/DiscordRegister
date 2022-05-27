const {Commands} = require("../../index.js")
module.exports = (client, interaction) => {
  if (interaction.isCommand()) {
    const cmd = Commands.commands.get(interaction.commandName)
    if (cmd) cmd.interact(client,interaction)
  }
}