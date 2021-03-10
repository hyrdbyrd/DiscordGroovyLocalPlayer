window.addEventListener('DOMContentLoaded', () => {
    const { afterFetch } = window.INTERNAL_EXPORTS;

    const form = document.querySelector('#form');

    const authBtn = form['auth-button'];
    const login = form.login;
    const password = form.password;

    authBtn.addEventListener('click', () => {
        afterFetch(fetch('/api/init', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ login: login.value, password: password.value })
        }));
    })

});
