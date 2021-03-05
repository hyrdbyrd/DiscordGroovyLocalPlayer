require('dotenv').config();

const channelId = '631765425075650571';

(async () => {
    const { DiscordApi } = require('./lib/DiscordApi');

    const d = new DiscordApi(process.env.EMAIL, process.env.PASSWORD);

    await d.auth();

    async function clear() {
        const messages = await d.getEveryMessagesFromChannel(channelId);
        if (!messages.length) return;

        const t = setInterval(() => {
            const message = messages.pop();
            if (!message) {
                clear();
                return clearInterval(t);
            }

            d.deleteMessageFromChannel(channelId, message.id);
        }, 2000);
    }

    clear();
})();
