const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to DB!'));

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name!'],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price!'],
  },
  rating: {
    type: Number,
    default: 0,
  },
});
const Tour = mongoose.model('Tour', tourSchema);

// Server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
