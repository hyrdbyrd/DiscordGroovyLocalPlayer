const path = require('path');
const express = require('express');
const opener = require('opener');

const { api } = require('./api');

const app = express();

app.set('view engine', 'pug');
app.set('views', './pages');

const PORT = 3000;

app
    .use(express.json())
    .use((req, res, next) => {
        res.locals.origin = `${req.protocol}://${req.hostname}${PORT ? ':' + PORT : ''}`;
        res.locals.path = req.path;
        next();
    })
    .use('/static', express.static(path.resolve('./static')))
    .get('/', (req, res) => res.render('auth'))
    .get('/:page', (req, res, next) => {
        try {
            res.render(req.params.page);
        } catch (e) {
            next();
        }
    })
    .use('/api', api)
    .listen(PORT, () => {
        const url = `http://localhost:${PORT}`;
        console.log(`Server started on ${url}`);
        opener(url);
    });
