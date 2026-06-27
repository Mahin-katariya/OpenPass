class APIError extends Error {
    
    constructor(message: string | undefined, public statusCode:number, public code: string){
        super(message)
    }

    static badRequestError(code: string, message: string | undefined = "Bad Request" ){
        return new APIError(message, 400, code);
    }

    static unAuthorizedError(code: string, message: string | undefined = "Unauthorized Request"){
        return new APIError(message, 401, code);
    }

    static forbiddenError(code: string, message: string | undefined = "Access Forbidden"){
        return new APIError(message,403,code);
    }

    static notFoundError(code: string, message: string | undefined = "Not Found!"){
        return new APIError(message, 404, code);
    }

    static conflictError(code: string, message: string | undefined =  'Encountered Conflict!'){
        return new APIError(message, 409, code)
    }
    
}

export default APIError