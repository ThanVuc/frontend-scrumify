import { apiClient } from "@/shared/apis/apiClient";

export const logout = async () => {
    await apiClient("/as/logout", {
        method: "POST",
    });
};
