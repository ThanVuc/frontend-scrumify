import { apiClient } from "@/shared/apis/apiClient";
import type { LoginRequest } from "../types/types/login.types";

export const login = async (data: LoginRequest) => {
    await apiClient("/as/login", {
        method: "POST",
        body: data,
    });
};
