require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder, User} = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on('ready', (c) => {
  console.log(`✅ ${c.user.tag} is online.`);
});

client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { guild, user, commandName, options} = interaction;

  if (interaction.commandName === 'verify') {
    return interaction.reply(`You are currently verified as ${user.username}.`);
  }

  if (commandName === 'getroles') {
    const embed = new EmbedBuilder()
      .setTitle(`Welcome to ${guild.name}, ${user.username}!`)
      .setColor('DarkBlue')
      .addFields(
        {
          name: '✅ Added Roles:',
          value: 'None',
          inline: true,
        },
        {
          name: '❌ Removed Roles:',
          value: 'None',
          inline: true,
        }
      );

    interaction.reply({ embeds: [embed] });
  }

  if (commandName === 'update') {
    const username = options.getUser('username');

    const embed = new EmbedBuilder()
      .setColor('DarkBlue')
      .addFields(
        {
          name: '✅ Added Roles:',
          value: 'None',
          inline: true,
        },
        {
          name: '❌ Removed Roles:',
          value: 'None',
          inline: true,
        }
      );
    
      interaction.reply({
        content: `${username} has been updated!`,
        embeds: [embed],
    });
  }
  if (commandName === 'setrank') {
    const username = options.getUser('username');
    const rank = options.getRole('rank');
    return interaction.reply(`${username} has been ranked to ${rank}.`);
  }
});

client.login(process.env.TOKEN);