import Swal from "sweetalert2";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";

export const startLogin = (credential, password) => {
  return async (dispatch) => {
    dispatch(startLoading());
    const resp = await fetchWithoutToken(
      "auth/login",
      { credential, password },
      "POST"
    );
    const { body, error } = await resp.json();

    if (body) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        login({
          id: body.id,
          firstName: body.firstName,
          lastName: body.lastName,
          imageUrl: body.imageUrl,
          role: body.role,
        })
      );
      dispatch(finishLoading());
    } else {
      dispatch(finishLoading());
      Swal.fire({
        text: error,
        confirmButtonColor: "#df4759",
      });
    }
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    const resp = await fetchWithToken("auth/renew");
    const { body } = await resp.json();

    if (body) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        login({
          id: body.id,
          firstName: body.firstName,
          lastName: body.lastName,
          imageUrl: body.imageUrl,
          role: body.role,
        })
      );
      dispatch(finishLoading());
      dispatch(checkingFinish());
    } else {
      dispatch(finishLoading());
      dispatch(checkingFinish());
    }
  };
};

const checkingFinish = () => ({ type: types.authCheckingFinish });

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
  };
};

const logout = () => ({ type: types.authLogout });
