const dotenv = require('dotenv')

const environment = process.env.NODE_ENV || 'development';

if (environment === 'production') {
    dotenv.config({ path: '.env.prod' });
} else {
    dotenv.config({ path: '.env.dev' });
}

