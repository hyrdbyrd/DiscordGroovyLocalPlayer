require('dotenv').config();

(async () => {
    const { DiscordApi } = require('./lib/DiscordApi');

    const channelId = '690180227745579019';

    const d = new DiscordApi(process.env.EMAIL, process.env.PASSWORD);

    await d.auth();

    async function clear() {
        const messages = (await d.getEveryMessagesFromChannel(channelId)).filter(({ content }) => /^(;;|-)/.test(content));
        if (!messages.length) return;

        const t = setInterval(() => {
            const message = messages.pop();
            if (!message) {
                clear();
                return clearInterval(t);
            }

            d.deleteMessageFromChannel(channelId, message.id);
        }, 1500);
    }

    clear();
})();
