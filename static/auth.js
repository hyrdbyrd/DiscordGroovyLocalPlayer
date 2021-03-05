const form = document.querySelector('#form');

const authBtn = form['auth-button'];

authBtn.addEventListener('click', () => {
    const login = form.login.value;
    const password = form.password.value;

    fetch('/api/init', {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ login, password })
    });
})
