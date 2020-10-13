/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';

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
