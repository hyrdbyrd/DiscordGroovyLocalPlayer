require('dotenv').config();

Array.prototype.shaffle = function() {
    return this.slice().sort(() => Math.random() > 0.5 ? 1 : -1);
};

const channelId = '514934553002115092';

(async () => {
    const { DiscordApi } = require('./lib/DiscordApi');
    const { VKMusicApi } = require('./lib/VKMusicApi');

    const d = new DiscordApi(process.env.EMAIL, process.env.PASSWORD);
    const m = new VKMusicApi();

    const playlist = await m.getListByOwnerId('152053194');

    // await d.auth();

    console.log(playlist.data);

    // const songs = playlist.tracks.map(({ title, artists: [{ name }] }) => `${title} ${name}`).shaffle();

    // const t = setInterval(() => {
    //     const song = songs.pop();
    //     if (!song) return clearInterval(t);
    //     d.sendMessageToChannel(channelId, `-p ${song}`);
    // }, 5000);
})();
