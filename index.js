
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const axios = require('axios');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent], 
    partials: [Partials.Channel]
});

const dotenv = require('dotenv');
dotenv.config();

let apiToken = process.env.TELEGRAM_TOKEN;
let chatId = process.env.TELEGRAM_CHANNEL;

//Logs
client.once('ready', () => {
    console.log("Bot has started.");
    client.user.setActivity("conversa fora");
});
client.once('reconnecting', () => {
    console.log('Reconnecting!');
});
client.once('disconnect', () => {
    console.log('Disconnect!');
});


client.on("messageCreate", (message) => {

    if (!message.content.toLowerCase().startsWith(process.env.prefix)) return;

    const args = message.content.split(' ');
    let command = process.env.PREFIX + args[0]

    let text = message.content.slice(command.length);
    let URL = `https://api.telegram.org/bot${apiToken}/sendMessage?chat_id=${chatId}&text=${text}`;
    axios.get(URL).then((response) => {
        message.channel.send("Mensagem enviada com sucesso!");
    })
});

client.login(process.env.DISCORD_TOKEN);