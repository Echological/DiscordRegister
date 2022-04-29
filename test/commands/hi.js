const { SlashCommandBuilder } = require('@discordjs/builders');

const {Permissions} = require("discord.js")

const command = new SlashCommandBuilder()
  .setName("hi")
  .setDescription("O hi")
  
module.exports = {
  command,
  meta: {
    "default_member_permissions": ""+Permissions.FLAGS.ADMINISTRATOR
  }
}