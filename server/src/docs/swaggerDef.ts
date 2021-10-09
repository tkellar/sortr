import { version } from '../../package.json';
import { SwaggerDefinition } from 'swagger-jsdoc';

const swaggerDef: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'sortr-server API Documentation',
    version,
    license: {
      name: 'MIT',
    },
  },
  servers: [{ url: `http://localhost:${process.env.SORTR_SERVER_PORT}/api/v1` }],
};

export default swaggerDef;
