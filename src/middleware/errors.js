const { ValidationError, UniqueConstraintError, ForeignKeyConstraintError } = require('sequelize');

function notFoundHandler(req, res) {
  res.status(404).json({ error: 'Not Found' });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  if (err instanceof ValidationError || err instanceof UniqueConstraintError) {
    return res.status(400).json({
      error: 'Validation failed',
      details: err.errors?.map((e) => ({ message: e.message, field: e.path })) || []
    });
  }

  if (err instanceof ForeignKeyConstraintError) {
    return res.status(400).json({
      error: 'Invalid foreign key reference'
    });
  }

  const status = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';

  if (status >= 500) {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  res.status(status).json({
    error: message
  });
}

module.exports = { notFoundHandler, errorHandler };

