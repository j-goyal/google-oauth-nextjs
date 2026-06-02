import { USER_SESSION_STATUSES } from "@/constants/userSessions";

export const getSessionStatusBadgeClass = (
  status: string
) => {
  switch (status) {
    case USER_SESSION_STATUSES.ACTIVE:
      return "bg-green-100 text-green-700";

    case USER_SESSION_STATUSES.EXPIRED:
      return "bg-yellow-100 text-yellow-800";

    case USER_SESSION_STATUSES.REVOKED:
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-200 text-gray-600";
  }
};