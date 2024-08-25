class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wronge",
        errors = [],
        statck = ""
    ) {
        super(message)
        this.statusCode = statusCode,
            this.data = null,
            this.message = message,
            this.succcess = false,
            this.errors = errors

        if (statck) {
            this.stack = statck
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }