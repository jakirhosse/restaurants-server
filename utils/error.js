class GeneralError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
    getCode() {
        return 500;
    }
}

class BadRequest extends GeneralError {
    constructor(message) {
        super(message);
        this.name = "BadRequest";
    }
    getCode() {
        return 400;
    }
}

class NotFound extends GeneralError {
    constructor(message) {
        super(message);
        this.name = "NotFound";
    }
    getCode() {
        return 404;
    }
}

module.exports = {
    GeneralError,
    BadRequest,
    NotFound
};
