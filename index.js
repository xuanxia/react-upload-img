'use strict';

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./lib/ru.production.min.js');
} else {
    module.exports = require('./lib/ru.development.js');
}