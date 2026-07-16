import ApiError from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json(
        new ApiError(
            statusCode,
            err.message || "Internal Server Error"
        )
    );
};

export default errorHandler;