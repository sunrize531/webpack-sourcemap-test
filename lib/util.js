import config from './config';

class Util {
    static get(key) {
        return config[key];
    }
}

export default Util