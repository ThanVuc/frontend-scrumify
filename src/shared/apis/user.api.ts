import type { User } from "../types/user";
import { apiClient } from "./apiClient";

export const getMe = async (): Promise<User> => {
    const response = await apiClient("/as/me");

    return response.json();
};
