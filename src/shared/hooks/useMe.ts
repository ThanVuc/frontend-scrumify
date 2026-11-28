import { useQuery } from "@tanstack/react-query";
import { getMe } from "../apis/user.api";
import { AUTH_QUERY_KEYS } from "../constants";

export const useMe = () => {
    return useQuery({
        queryKey: AUTH_QUERY_KEYS.currentUser,
        queryFn: getMe,
    });
};
