const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingsModel');
const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.alerts = (req, res, next) => {
  const { alert } = req.query;
  if (alert === 'booking')
    res.locals.alert =
      "Your booking was successful! Check your email for confirmation. If your bookings don't show up immedieately please come back later!";
  next();
};

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1. Get Tour data from collection
  const tours = await Tour.find();

  // 2. Build template
  // 3. Render that template from the step 1
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1. Get the data for the requested tour including reviews and guides
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name!', 404));
  }

  // Is the tour booked by the user
  if (res.locals.user._id) {
    const bookings = await Booking.find({ user: res.locals.user._id });
    bookings.forEach((el) => {
      if (el.tour.id === tour.id) {
        tour.isBookedByUser = true;
      }
    });
  }

  // 2. Build templates
  // 3. Render that template from the step 1
  res.status(200).render('tour', {
    title: tour.name,
    tour,
  });
});

exports.getMyTours = catchAsync(async (req, res, next) => {
  // Find the bookings
  const bookings = await Booking.find({ user: req.user.id });

  // Find the tours with returned ids
  const tourIDs = bookings.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('overview', {
    title: 'My tours',
    tours,
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};

exports.getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Sign up for an account',
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
};

exports.getMyReviews = catchAsync(async (req, res, next) => {
  // Find the reviews matching the user
  const reviews = await Review.find({ user: req.user.id }).populate({
    path: 'tour',
    fields: 'name imageCover',
  });

  res.status(200).render('reviews', {
    title: 'Your reviews',
    reviews,
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).render('account', {
    title: 'Your account',
    user,
  });
});
