export interface AppResponse<T> {
    success: boolean;
    data: T;
    errors: string[];
}