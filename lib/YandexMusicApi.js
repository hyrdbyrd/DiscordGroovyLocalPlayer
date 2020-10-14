const axios = require('axios');

const { Formatter } = require('./Formatter');

const API_HOST = 'https://music.yandex.ru/';

exports.YandexMusicApi = class {
    constructor() {
        this._instance = axios.create({
            baseURL: API_HOST
        });
    }

    getPlaylist = (owner, kinds, lang = 'ru') =>
        this._instance.get(`/handlers/playlist.jsx${Formatter.toQueryString({ owner, lang, kinds })}`)
            .then(({ data }) => data.playlist)
            .catch(console.error);

    getAlbum = (album, lang = 'ru') =>
        this._instance.get(`/handlers/album.jsx${Formatter.toQueryString({ album, lang })}`);
};
