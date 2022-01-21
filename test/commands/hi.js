const { SlashCommandBuilder } = require('@discordjs/builders');

const command = new SlashCommandBuilder()
  .setName("hi")
  .setDescription("O hi")
  
module.exports = {
  command,
}