const { ZodError } = require('zod');

function validateBody(schema) {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          error: 'Validation error',
          details: err.issues.map((i) => ({
            path: i.path.join('.'),
            message: i.message
          }))
        });
      }
      next(err);
    }
  };
}

module.exports = { validateBody };

