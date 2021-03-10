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

const notice = (msg, status = 'success') => {
    let box = document.querySelector('#notice-box');
    if (!box) {
        box = document.createElement('div');
        box.id = 'notice-box';
        box.classList.add('notice-box');
        document.body.appendChild(box);
    }

    const msgBlock = document.createElement('div');
    msgBlock.classList.add('notice-box__message', 'notice-box__message_hidden', `notice-box__message_status_${status}`);
    msgBlock.textContent = msg;

    box.appendChild(msgBlock);

    setTimeout(() => msgBlock.classList.remove('notice-box__message_hidden'), 200);

    const close = () => { try { box.removeChild(msgBlock); } catch (e) {} };
    setTimeout(close, 5000);
    msgBlock.addEventListener('click', close);
};

const showSuccess = msg => {
    const form = document.querySelector('.form');
    form.classList.add('form_status_success');
    setTimeout(() => form.classList.remove('form_status_success'), 5000);
    msg && notice(msg);
};

const showError = msg => {
    const form = document.querySelector('.form');
    form.classList.add('form_status_error');
    setTimeout(() => form.classList.remove('form_status_error'), 5000);
    msg && notice(msg);
}

button.addEventListener('click', () => {
    let input = {};

    switch (type) {
        case 'playlist':
            input = {
                channelId: channelId.value,
                owner: owner.value,
                kinds: kinds.value,
                order: order.value,
            };
            break;
        case 'album':
            input = {
                channelId: channelId.value,
                album: album.value,
                order: order.value,
            };
            break;
        case 'author':
            input = {
                channelId: channelId.value,
                author: author.value,
                order: order.value,
            }
            break;
    }

    fetch('/api/play', {
        ...defaultOpts,
        body: JSON.stringify({ type, input })
    })
        .then(e => e.json())
        .then(e => e.success)
        .then(isSuccess => {
            if (isSuccess)
                showSuccess('Всё чики пуки');
            else throw new Error('Чёто точно поломалося');
        })
        .catch(() => showError('Чето сломалося'));
});
