const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Parking API',
      version: '1.0.0'
    },
    servers: [{ url: 'http://localhost:' + (process.env.PORT || 3000) }]
  },
  apis: ['./src/swagger-components.js', './src/routes/*.routes.js']
});

module.exports = { swaggerUi, swaggerSpec };

