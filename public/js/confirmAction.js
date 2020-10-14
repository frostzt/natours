/* eslint-disable */
import { deleteReview, updateReview, addReview } from './updateReview';

// Confirm action and update reviews
export function confirmAction(id, type) {
  let html;
  if (type === 'delete') {
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
    const confirmYes = document.getElementById('confirm-yes');
    confirmYes.addEventListener('click', () => {
      confirmYes.textContent = 'Deleting...';
      deleteReview(id);
    });
    document.getElementById('confirm-no').addEventListener('click', () => {
      document.querySelector('.overlay').remove();
    });
  } else if (type === 'update') {
    html = `
            <div class="overlay">
              <div class="main-content ${type}">
                <h2 class="main-content__heading ma-bt-lg">Update your review!</h2>
                <textarea class="ma-bt-lg" id="review_text" placeholder="Your review..."></textarea>
                <div class="confirm-buttons">
                  <a id="confirm-yes" class="btn btn--green btn--small">Update</a>
                  <a id="confirm-no" class="btn btn--red btn--small">Cancel</a>
                </div>
              </div>
            </div>
    `;
    document.querySelector('body').insertAdjacentHTML('afterbegin', html);
    const confirmYes = document.getElementById('confirm-yes');
    confirmYes.addEventListener('click', () => {
      confirmYes.textContent = 'Updating...';
      const review = document.getElementById('review_text').value;
      updateReview(id, review);
    });
    document.getElementById('confirm-no').addEventListener('click', () => {
      document.querySelector('.overlay').remove();
    });
  }
}

export function createReview(tour, user) {
  let html = `
    <div class="overlay">
      <div class="main-content update">
        <h2 class="main-content__heading ma-bt-lg">Leave a review!</h2>
        <textarea class="ma-bt-lg" id="review_text" placeholder="Your review..."></textarea>
        <label for="cars">Your review:</label>
        <select name="rating" id="rating">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <div class="confirm-buttons">
          <a id="confirm-yes" class="btn btn--green btn--small">Add</a>
          <a id="confirm-no" class="btn btn--red btn--small">Cancel</a>
        </div>
      </div>
    </div>
  `;

  document.querySelector('body').insertAdjacentHTML('afterbegin', html);
  const confirmYes = document.getElementById('confirm-yes');
  confirmYes.addEventListener('click', () => {
    confirmYes.textContent = 'Thank you...';
    const review = document.getElementById('review_text').value;
    const rating = document.getElementById('rating').value;
    addReview(review, rating, tour, user);
  });
  document.getElementById('confirm-no').addEventListener('click', () => {
    document.querySelector('.overlay').remove();
  });
}
