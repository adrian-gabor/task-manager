

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || 'Wystąpił błąd serwera';


    res.status(statusCode).json({ 
        error: {
            message: errorMessage,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        }  
    });
}

module.exports = errorHandler;