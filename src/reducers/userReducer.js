import { types } from "src/types/types";

const initialState = {};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.userFetch:
      return {
        ...state,
        ...action.payload,
      };
    case types.userPurge:
      return {
        initialState,
      };
    default:
      return state;
  }
};
