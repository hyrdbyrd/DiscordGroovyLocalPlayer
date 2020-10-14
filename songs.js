require('dotenv').config();

Array.prototype.shaffle = function() {
    return this.slice().sort(() => Math.random() > 0.5 ? 1 : -1);
};

const channelId = '631765425075650571';
const playlistId = '3';
const albumId = '4817710';

(async () => {
    const { DiscordApi } = require('./lib/DiscordApi');
    const { YandexMusicApi } = require('./lib/YandexMusicApi');

    const d = new DiscordApi(process.env.EMAIL, process.env.PASSWORD);
    const m = new YandexMusicApi();

    const playlist = await m.getPlaylist('IRuss23', playlistId);
    const album = await m.getAlbum(albumId);

    await d.auth();

    const songs = playlist.tracks.map(({ title, artists: [{ name }] }) => `${title} ${name}`).shaffle();

    // const songs = album.volumes.reduce((acc, cur) => acc.concat(cur), []).map(({ title, artists: [{ name }] }) => `${title} ${name}`);
    // const songs = require('./db.json')['memes'].shaffle();

    const t = setInterval(() => {
        const song = songs.pop();
        if (!song) return clearInterval(t);
        d.sendMessageToChannel(channelId, `-p ${song}`);
    }, 5000);
})();
