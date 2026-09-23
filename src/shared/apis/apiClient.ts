import { ApiError, type ApiErrorResponse } from "../types/error";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type ApiRequestOptions = Omit<RequestInit, "body"> & {
    query?: Record<string, string | number | boolean | undefined>;
    body?: unknown;
};

export const apiClient = async (
    path: string,
    options: ApiRequestOptions = {},
) => {
    const { query, body, headers, ...requestInit } = options;

    const url = new URL(`${API_BASE_URL}${path}`);

    if (query) {
        Object.entries(query).forEach(([key, value]) => {
            if (value !== undefined) {
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
        const errorBody: ApiErrorResponse = await response.json();

        throw new ApiError(errorBody, response.status);
    }

    return response;
};
