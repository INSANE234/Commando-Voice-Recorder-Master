const { Command } = require('discord.js-commando');
const fs = require('fs');
module.exports = class Record extends Command {
  constructor(client) {
    super(client, {
      name: 'record',
      memberName: 'record',
      group: 'master',
      guildOnly: true,
      description: 'Record the member audio in a voice channel.',
      examples: ['record']
    });
    this.guild = {};
  }
  async run(msg) {
    if(!msg.member.voiceChannel) return null;
    const channel = msg.member.voiceChannel;
    const permissions = channel.permissionsFor(this.client.user);
    if(!permissions.has('SPEAK') || !permissions.has('CONNECT')) return null;
    const connection = await channel.join();
    this.guild.ch = channel;
    const receiver = connection.createReceiver();
    msg.say('i\'m ready to record audio!');
    connection.on('speaking', (user, speaking) => {
      if(speaking) {
        msg.say(`I'm listening to ${user}`);
        const audioStream = receiver.createPCMStream(user);
        const outputStream = this.generateStream(channel, user);
        audioStream.pipe(outputStream);
        outputStream.on('data', console.log);
        audioStream.on('end', () => {
          msg.say(`I'm no longer listening to ${user}`);
        });
      }
    });
  }
  generateStream(channel, member) {
    const fileName = `./recordings/${channel.name}-${member.username}-${Date.now()}.pcm`;
    return fs.createWriteStream(fileName);
  }
};