const Commando = require('discord.js-commando');
const { token, prefix } = require('./settings.json');
const client = new Commando.CommandoClient({
  disableEveryone: true,
  owner: ['Your id goes here!'],
  commandPrefix: prefix
});
const path = require('path');
client.registry
  .registerGroups([
    ['master', 'Master Commands']
  ])
  .registerCommandsIn(path.join(__dirname, 'commands'))
  .registerDefaultTypes();

client.login(token);

client.on('ready', () => {
  console.log('i\'m ready!');
});
process.on('unhandledRejection', (reason, p) => {
  p.catch(e => {
    console.error('Unhandled Rejection at:', e.stack, 'reason:', reason);
  });
});