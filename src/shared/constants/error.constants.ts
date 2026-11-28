export const CLIENT_ERROR_CODE = {
  NETWORK_ERROR: "NETWORK_ERROR",
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
} as const;

export type ClientErrorCode =
  (typeof CLIENT_ERROR_CODE)[keyof typeof CLIENT_ERROR_CODE];
