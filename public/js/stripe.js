/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51HYrAEHnRJNf1Vr0AHnKsLO3D5njIfkcSxn30R7TsyC95qlVssPs4AfiKsdgF4jIymy4VQpQhKaLZMrvSeFGkSFo00ARhbm3iM'
);

export const bookTour = async (tourID) => {
  try {
    // Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourID}`);

    // Create checkout form or charge the CC
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
