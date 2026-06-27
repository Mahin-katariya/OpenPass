class APIResponse {
    public success = true
    constructor(
        public statusCode: number,
        public data: unknown,
        public message: string | undefined,
    ){

    }
}

export default APIResponse;