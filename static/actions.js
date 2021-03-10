window.addEventListener('DOMContentLoaded', () => {
    const { afterFetch } = window.INTERNAL_EXPORTS;

    const value = document.querySelector('#channel-id');

    const createHandle = handle =>
        document.getElementById(handle).addEventListener('click', () =>
            afterFetch(fetch(`/api/${handle}`, {
                method: 'post',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ channelId: value.value })
            }))
        );

    createHandle('clear');
    createHandle('clear-commands');
    createHandle('clear-bot-messages');
});
