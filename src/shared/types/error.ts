export interface ApiErrorResponse {
    code: string;
    detail: string;
    path: string;
    traceId: string;
}

export class ApiError extends Error {
    readonly code: string;
    readonly path: string;
    readonly traceId: string;
    readonly status: number;

    constructor(
        response: ApiErrorResponse,
        status: number,
    ) {
        super(response.detail);

        this.name = "ApiError";
        this.code = response.code;
        this.path = response.path;
        this.traceId = response.traceId;
        this.status = status;
    }
}
