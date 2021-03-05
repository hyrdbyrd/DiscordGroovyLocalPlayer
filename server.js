const path = require('path');
const express = require('express');

const { api } = require('./api');

const app = express();

app
    .use(express.json())
    .use('/static', express.static(path.resolve('./static')))
    .get('/', (req, res) => res.sendFile(path.resolve('./static/index.html')))
    .get('/playlist', (req, res) => res.sendFile(path.resolve('./static/playlist.html')))
    .get('/album', (req, res) => res.sendFile(path.resolve('./static/album.html')))
    .get('/author', (req, res) => res.sendFile(path.resolve('./static/author.html')))
    .get('/actions', (req, res) => res.sendFile(path.resolve('./static/actions.html')))
    .use('/api', api)
    .listen(3000);
