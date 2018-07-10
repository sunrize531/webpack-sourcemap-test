"use strict";
const config = require('./config');

class Util {
    static get(key) {
        return config[key];
    }
}

module.exports = Util;