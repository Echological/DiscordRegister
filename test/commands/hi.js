const { SlashCommandBuilder } = require('@discordjs/builders');

const { Permissions } = require("discord.js")

const command = new SlashCommandBuilder()
  .setName("hi")
  .setDescription("O hi")
  .setDefaultPermission(false)

module.exports = {
  command,
  interact: async(client, interaction) => {
    interaction.reply("HI!", {ephemeral: true})
  }
}