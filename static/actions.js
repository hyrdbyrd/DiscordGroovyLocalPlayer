const g = document.querySelector;

const value = document.querySelector('#channel-id');

const opts = () => ({
    method: 'post',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ channelId: value.value })
});

document.querySelector('#clear').addEventListener('click', () => fetch('/api/clear', opts()))
document.querySelector('#clear-commands').addEventListener('click', () => fetch('/api/clear-commands', opts()));
document.querySelector('#clear-bot-messages').addEventListener('click', () => fetch('api/clear-bot-messages', opts()));
