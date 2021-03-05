require('dotenv').config();

const express = require('express');
const { DiscordApi } = require('./lib/DiscordApi');
const { YandexMusicApi } = require('./lib/YandexMusicApi');

const api = express.Router();

const d = new DiscordApi(process.env.EMAIL, process.env.PASSWORD);
const y = new YandexMusicApi();

d.auth();

const shaffle = arr => [...arr].sort(() => Math.random() > 0.5 ? 1 : -1);

let intervals = [];

const stop = () => {
    intervals.forEach(clearInterval);
    intervals = [];
}

const sendSongsByTimeout = (channelId, songs) => {
    const t = setInterval(() => {
        const song = songs.pop();
        if (!song) return clearInterval(t);
        d.sendMessageToChannel(channelId, `-p ${song}`);
    }, 5000)
    intervals.push(t);
}

const play = async (type, input) => {
    let result = [];

    switch (type) {
        case 'playlist': {
            const playlist = await y.getPlaylist(input.owner, input.kinds, input.lang);
            result = playlist.tracks.map(({ title, artists: [{ name }] }) => `${title} ${name}`).reverse();
            break;
        }
        case 'album': {
            const album = await y.getAlbum(input.album, input.lang);
            result = album.volumes.reduce((acc, cur) => acc.concat(cur), []).map(({ title, artists: [{ name }] }) => `${title} ${name}`);
            break;
        }
        case 'author': {
            const artist = await y.getArtist(input.author, input.lang);
            result = artist.tracks.map(({ title, artists: [{ name }] }) => `${title} ${name}`).reverse();
            break;
        }
    }

    if (input.order === 'shaffle')
        result = shaffle(result);
    if (input.order === 'reverse')
        result = result.reverse();
    if (input.slice)
        result = result.slice(input.slice.from, input.slice.to);

    sendSongsByTimeout(input.channelId, [...result]);
}

async function clear(channelId, filterFunc) {
    let messages = await d.getEveryMessagesFromChannel(channelId);
    if (filterFunc)
        messages = messages.filter(filterFunc);

    if (!messages.length) return;

    const t = setInterval(() => {
        const message = messages.pop();
        if (!message) {
            clear(channelId, filterFunc);
            return clearInterval(t);
        }

        d.deleteMessageFromChannel(channelId, message.id);
    }, 2000);
    intervals.push(t);
}

const sendSuccess = res => {
    res.status = 200;
    res.json({ success: true });
    res.send();
}

api
    .post('/init', async (req, res) => {
        console.log(req.body);
        const { login, password } = req.body;
        d.init(login, password);
        await d.auth();
        sendSuccess(res);
    })
    .post('/play', (req, res) => {
        const { type, input } = req.body;
        play(type, input);
        sendSuccess(res);
    })
    .post('/clear', (req, res) => {
        clear(req.body.channelId);
        sendSuccess(res);
    })
    .post('/clear-commands', (req, res) => {
        clear(req.body.channelId, ({ content }) => /^(;;|-)/.test(content));
        sendSuccess(res);
    })
    .post('/clear-bot-messages', (req, res) => {
        clear(req.body.channelId, ({ author }) => author.bot);
        sendSuccess(res);
    })
    .post('/stop', (req, res) => {
        stop();
        sendSuccess(res);
    })
    .use((req, res, next, err) => {
        console.error(err);

        res.status = 500;
        res.json({ success: false });
        res.send();
    });

exports.api = api;
