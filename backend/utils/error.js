class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }

} class NotFoundError extends AppError {
    constructor(message = 'Zasób nie został znaleziony.') {
        super(message, 404);
    }

} class BadRequestError extends AppError {
    constructor(message = 'Nieprawidłowe zapytanie.') {
        super(message, 400);
    }

} module.exports = { AppError, NotFoundError, BadRequestError };