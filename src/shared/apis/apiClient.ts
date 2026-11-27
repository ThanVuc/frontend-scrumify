import { ApiError, type ApiErrorResponse } from "../types/error";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/v1";

type QueryParamPrimitive = string | number | boolean;

type ApiRequestOptions = Omit<RequestInit, "body"> & {
    query?: Record<string, QueryParamPrimitive | QueryParamPrimitive[] | undefined>;
    body?: unknown;
};

export const apiClient = async (
    path: string,
    options: ApiRequestOptions = {},
) => {
    const { query, body, headers, ...requestInit } = options;

    const url = new URL(`${API_BASE_URL}${path}`, window.location.origin);

    if (query) {
        Object.entries(query).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((item) => {
                    url.searchParams.append(key, String(item));
                });
            } else if (value !== undefined) {
                url.searchParams.set(key, String(value));
            }
        });
    }

    const response = await fetch(url, {
        ...requestInit,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        credentials: "include",
        body: body !== undefined
            ? JSON.stringify(body)
            : undefined,
    });

    if (!response.ok) {
        let parsedBody: Partial<ApiErrorResponse> = {};
        try {
            const json: unknown = await response.json();
            if (json && typeof json === "object") {
                parsedBody = json as Partial<ApiErrorResponse>;
            }
        } catch {
            // Non-JSON or empty error body; fall back to HTTP status
        }

        const errorBody: ApiErrorResponse = {
            code: typeof parsedBody.code === "string" && parsedBody.code.length > 0
                ? parsedBody.code
                : `HTTP_${response.status}`,
            detail: parsedBody.detail ?? (response.statusText || "Request failed"),
            path: parsedBody.path ?? path,
            traceId: parsedBody.traceId ?? "",
        };

        throw new ApiError(errorBody, response.status);
    }

    return response;
};
