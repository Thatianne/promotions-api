const { NOT_FOUND } = require('../helpers/statusCode')

class NotFound extends Error {
    constructor (message) {
        super()
        this.message = message
        this.statusCode = NotFound.STATUS_CODE
    }

    static get STATUS_CODE () {
        return NOT_FOUND
    }
}

module.exports = NotFound