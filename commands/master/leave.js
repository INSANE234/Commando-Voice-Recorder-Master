const { Command } = require('discord.js-commando');
module.exports = class Leave extends Command {
  constructor(client) {
    super(client, {
      name: 'leave',
      memberName: 'leave',
      group: 'master',
      guildOnly: true,
      description: 'Leave the recording voice channel',
      examples: ['leave']
    });
  }
  async run(msg) {
    const guild = this.client.registry.resolveCommand('master:record').guild;
    await guild.ch.leave();
    return msg.say('Audio recording stopped!');
  }
};