export interface Response {
    status: string,
    message: string,
    data?: any
}

export interface ServiceError {
    message?: string,
    stack?: string
}