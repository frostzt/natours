/* eslint-disable */
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout } from './login';
import { signup } from './signup';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';
import { showAlert } from './alerts';
import { deleteReview } from './updateReview';

// DOM Elements
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const signupForm = document.querySelector('.form--signup');
const logOutBtn = document.querySelector('.nav__el--logout');
const formUserData = document.querySelector('.form-user-data');
const formUserPassword = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');
const myReview = document.querySelector('.my-reviews');
const deleteBtn = document.getElementById('delete-review');
const updateBtn = document.getElementById('update-review');

// Delegation
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    signup(name, email, password, passwordConfirm);
  });
}

if (formUserData) {
  formUserData.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    updateSettings(form, 'data');
  });
}

if (formUserPassword) {
  formUserPassword.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent =
      'Updating password...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'SAVE PASSWORD';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (bookBtn) {
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}

if (myReview) {
  myReview.addEventListener('click', (e) => {
    if (e.target !== e.currentTarget) {
      if (e.target.id === 'delete-review') {
        const id = e.target.parentNode.dataset.id;
        confirmAction(id, 'delete');
      }
    }
    e.stopPropagation();
  });
}

function confirmAction(id, type) {
  if (type === 'delete') {
    let html;
    html = `
            <div class="overlay">
              <div class="main-content ${type}">
                <h2 class="main-content__heading ma-bt-lg">Are you sure?</h2>
                <div class="confirm-buttons">
                  <a id="confirm-yes" class="btn btn--green btn--small">Yes</a>
                  <a id="confirm-no" class="btn btn--red btn--small">No</a>
                </div>
              </div>
            </div>
    `;
    document.querySelector('body').insertAdjacentHTML('afterbegin', html);
    // deleteReview(id);
  }
}

const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 10);
