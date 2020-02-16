const autoBind = require('auto-bind');

class BaseController {
    constructor() {
        if (this === BaseController) {
            throw new Error('Can not construct an abstract class.');
        }
        autoBind(this);
    }

    throwError(message, code, severity) {
        const error = new Error(message);
        error.code = code;
        error.severity = severity;
        throw error;
    }
}

module.exports = BaseController;
