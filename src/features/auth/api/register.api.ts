import { apiClient } from "@/shared/apis/apiClient";
import type { RegisterRequest } from "../types/types/register.types";

export const register = async (data: RegisterRequest) => {
    await apiClient("/as/register", {
        method: "POST",
        body: data,
    });
}
