/* eslint-disable */

const login = async (email, password) => {
  try {
    console.log(email, password);
    const res = await axios({
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      //   'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
      //   'Access-Control-Allow-Headers': 'Content-Type',
      // },
      method: 'POST',
      url: 'http://127.0.0.1/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

document.querySelector('.form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password);
});
