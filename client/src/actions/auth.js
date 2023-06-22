import * as api from "../api/index";
import { AUTH, LOGOUT, USER } from "../constants/actiontypes";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const res = await api.signin(formData);
    const data = res.data;
    if (data.error) return alert(data.error);
    // console.log(data)
    dispatch({ type: AUTH, payload: data });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const res = await api.signup(formData);
    const data = res.data;
    if (data.error) return alert(data.error);
    // console.log(data)
    dispatch({ type: AUTH, payload: data });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const logout = (navigate) => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
