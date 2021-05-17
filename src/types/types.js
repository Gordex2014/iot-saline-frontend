export const types = {
  authCheckingFinish: "[auth] Finish checking login state",
  authLogin: "[auth] Login",
  authStartTokenRenew: "[auth] Start token renew",
  authLogout: "[auth] Logout",

  userFetch: "[user] Fetch",
  userPurge: "[user] Purge",

  eventLogout: "[event] Logout event",

  uiSetError: "[UI] Set Error",
  uiRemoveError: "[UI] Remove Error",
  uiStartLoading: "[UI] Start Loading",
  uiFinishLoading: "[UI] Finish Loading",
};

export const validRoles = {
  admin: "USER_ADMIN_ROLE",
  doctor: "USER_DOCTOR_ROLE",
};
