const form = document.querySelector('#form');

const defaultOpts = {
    method: 'post',
    headers: { 'content-type': 'application/json' },
};

const type = form['type'].value;

const channelId = form['channel-id'];
const kinds = form.kinds;
const album = form.album;
const author = form.author;
const owner = form.owner;
const order = form.order;
const button = form.button;

button.addEventListener('click', () => {
    switch (type) {
        case 'playlist': {
            fetch('/api/play', {
                ...defaultOpts,
                body: JSON.stringify({
                    type,
                    input: {
                        channelId: channelId.value,
                        owner: owner.value,
                        kinds: kinds.value,
                        order: order.value,
                    }
                })
            });
            break;
        }
        case 'album': {
            fetch('/api/play', {
                ...defaultOpts,
                body: JSON.stringify({
                    type,
                    input: {
                        channelId: channelId.value,
                        album: album.value,
                        order: order.value,
                    }
                })
            });
            break;
        }
        case 'author': {
            fetch('/api/play', {
                ...defaultOpts,
                body: JSON.stringify({
                    type,
                    input: {
                        channelId: channelId.value,
                        author: author.value,
                        order: order.value,
                    }
                })
            });
            break;
        }
    }
});
