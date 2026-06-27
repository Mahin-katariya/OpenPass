class APIError extends Error {
    
    constructor(message: string, public statusCode:number, public code: string){
        super(message)
    }

    static badRequestError(code: string, message = "Bad Request"){
        return new APIError(message, 400, code);
    }

    static unAuthorizedError(code: string, message = "Unauthorized Request"){
        return new APIError(message, 401, code);
    }

    static forbiddenError(code: string, message = "Access Forbidden"){
        return new APIError(message,403,code);
    }

    static notFoundError(code: string, message: "Not Found!"){
        return new APIError(message, 404, code);
    }

    static conflictError(code: string, message: 'Encountered Conflict!'){
        return new APIError(message, 409, code)
    }
    
}

export default APIError