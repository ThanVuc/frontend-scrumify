import { useQuery } from "@tanstack/react-query";
import { getMe } from "../apis/user.api";


export const useMe = () => {
    return useQuery({
        queryKey: ["auth", "current-user"],
        queryFn: getMe,
    });
};
