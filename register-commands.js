require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType} = require('discord.js');

const commands = [
  {
    name: 'verify',
    description: 'Verifies your Roblox account.',
  },
  {
    name: 'getroles',
    description: 'Syncs your roles with the Roblox group.',
  },
  {
    name: 'update',
    description: "Force updates a user.",
    options: [
      {
        name: 'username',
        description: 'Their Username',
        type: ApplicationCommandOptionType.User,
        required: true,
      },
    ],
  },
  {
    name: 'setrank',
    description: "Sets a user's rank.",
    options: [
      {
        name: 'username',
        description: 'Their Username',
        type: ApplicationCommandOptionType.User,
        required: true,
      },
      {
        name: 'rank',
        description: 'Rank',
        type: ApplicationCommandOptionType.Role,
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registering global slash commands...');
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );
    console.log('Global slash commands were registered successfully!');

    console.log('Registering guild slash commands...');
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );
    console.log('Guild slash commands were registered successfully!');
  } catch (error) {
    console.error(`Error registering slash commands: ${error.message}`);
  }
})();
