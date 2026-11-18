const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Opsi konfigurasi Swagger
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Todos API - Gamelab Production Stage',
            version: '1.0.0',
            description: 'Dokumentasi API untuk aplikasi Todos menggunakan Express dan MongoDB, lengkap dengan autentikasi dan statistik API Key.',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development Server',
            },
        ],
        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'x-api-key',
                    description: 'Masukkan API Key untuk mengakses endpoint statistik',
                },
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Masukkan token JWT untuk autentikasi user',
                },
            },
        },
    },
    // Lokasi file yang membaca JSDoc komentar Swagger (arahkan ke route Kakak)
    apis: ['./src/route/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log('Swagger Docs available at http://localhost:5000/api-docs');
};

module.exports = swaggerDocs;