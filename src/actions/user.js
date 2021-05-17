import { fetchWithToken } from "src/helpers/fetch";
import { types, validRoles } from "src/types/types";
import { finishLoading, startLoading } from "./ui";

export const startFetchingUser = () => {
  return async (dispatch, getState) => {
    dispatch(startLoading());
    const { id, role } = getState().auth;
    let resp = {};
    if (role === validRoles.admin) {
      resp = await fetchWithToken(`users/admins/${id}`);
    } else {
      resp = await fetchWithToken(`users/doctors/${id}`);
    }

    const { body } = await resp.json();

    if (body) {
      dispatch(userFetch(body));
      dispatch(finishLoading());
    } else {
      dispatch(finishLoading());
    }
  };
};

const userFetch = (user) => ({
  type: types.userFetch,
  payload: user,
});

export const userPurge = () => ({ type: types.userPurge });
