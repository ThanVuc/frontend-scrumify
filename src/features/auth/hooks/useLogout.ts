import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/toast";
import { queryClient } from "@/lib/query-client";
import { logout } from "../api/logout.api";

export const useLogout = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ["auth", "current-user"] });
            toast.add({
                title: "Logout successful",
                description: "You have signed out successfully.",
                type: "success",
            });
            navigate("/auth", { replace: true });
        },
    });
};
