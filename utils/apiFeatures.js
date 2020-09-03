class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // 1A. Filtering
    // const {...this.queryString, page, sort, limit, fields } = req.query;
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B. Adv Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    // 2. Sorting
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    // 3. Field Limiting
    if (this.queryString.fields) {
      const fieldsVal = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fieldsVal);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    // 4. Pagination
    const pageNum = this.queryString.page * 1 || 1;
    const disLimit = this.queryString.limit * 1 || 100;
    const skip = (pageNum - 1) * disLimit;

    this.query = this.query.skip(skip).limit(disLimit);

    return this;
  }
}

module.exports = APIFeatures;
