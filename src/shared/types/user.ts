
export type UserRole = "MEMBER" | "ADMIN";
export type UserStatus = "ACTIVE" | "DISABLED";

export interface User {
    id: string;
    username: string;
    email: string;
    roles: UserRole;
    status: UserStatus;
    avatarUrl: string;
    createdAt: string;
    updatedAt: string;
    lastLoginAt: string | null;
}
