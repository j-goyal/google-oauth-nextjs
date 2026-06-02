export const USER_ROLES = {
    SUPERADMIN: 'SuperAdmin',
    ADMIN: 'Admin',
    USER: 'User'
}

export const ADMIN_ROLES = [
  USER_ROLES.ADMIN,
  USER_ROLES.SUPERADMIN,
];

export const USER_ROLE_OPTIONS = [
  {
    label: "User",
    value: USER_ROLES.USER,
  },
  {
    label: "Admin",
    value: USER_ROLES.ADMIN,
  },
  {
    label: "Super Admin",
    value: USER_ROLES.SUPERADMIN,
  },
];