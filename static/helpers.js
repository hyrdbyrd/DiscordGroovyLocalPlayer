(() => {
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

        const close = () => { try { box.removeChild(msgBlock); } catch (e) { } };
        setTimeout(close, 5000);
        msgBlock.addEventListener('click', close);
    };

    const showSuccess = msg => {
        const form = document.querySelector('.form__form');
        form.classList.add('form_status_success');
        setTimeout(() => form.classList.remove('form_status_success'), 3000);
        msg && notice(msg);
    };

    const showError = msg => {
        const form = document.querySelector('.form__form');
        form.classList.add('form_status_error');
        setTimeout(() => form.classList.remove('form_status_error'), 3000);
        msg && notice(msg, 'error');
    };

    const afterFetch = req => req
        .then(e => e.json())
        .then(e => e.success)
        .then(isSuccess => {
            if (isSuccess)
                showSuccess('Всё чики пуки');
            else throw new Error('Чёто точно поломалося');
        })
        .catch(() => showError('Чето сломалося'));

    window.INTERNAL_EXPORTS = {
        notice,
        showSuccess,
        showError,
        afterFetch
    };
})();
