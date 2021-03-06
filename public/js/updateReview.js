/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';

export const addReview = async (review, rating, tour, user) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/review/',
      data: {
        review,
        rating,
        tour,
        user,
      },
    });

    if (res.data.status === 'success') {
      showAlert(res.data.status, 'Thanks for your review!');
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err);
  }
};

export const updateReview = async (reviewId, review) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/review/${reviewId}`,
      data: {
        review,
      },
    });

    if (res.data.status === 'success') {
      showAlert(res.data.status, 'Review updated!');
      window.setTimeout(() => {
        location.assign('/my-reviews');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err);
  }
};

export const deleteReview = async (reviewId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/v1/review/${reviewId}`,
    });

    if (res.status === 204) {
      showAlert('success', 'Review deleted!');
      window.setTimeout(() => {
        location.assign('/my-reviews');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err);
  }
};
