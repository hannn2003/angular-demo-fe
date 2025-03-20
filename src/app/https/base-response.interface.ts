export interface IBaseResponse<T> {
    code: string | number
    message: string
    result: T
}
