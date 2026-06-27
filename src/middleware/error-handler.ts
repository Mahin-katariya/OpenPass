import type { Request, Response, NextFunction } from "express";
import APIError from "../utils/APIErrors.js";

export const errorHandler = (err: APIError, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof APIError){
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            code: err.code
        })
    }
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        code: "INTERNAL_SERVER_ERROR"
    })
}