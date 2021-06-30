import {
    USER_LOGIN_FULFILLED,
    USER_REGISTER_FULFILLED,
    USER_LOGOUT,
    USER_LOGIN_PENDING,
    USER_LOGIN_REJECTED,
} from "./actions";

const API_URL = "https://ubicado.herokuapp.com/";

export const userLogin = (data) => {
    return (dispatch) => {
        dispatch({ type: USER_LOGIN_PENDING });
        return fetch(`${API_URL}user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
                let err;
                switch (response.status) {
                    case 400:
                        err = "Connection failed";
                        break;
                    case 431:
                        err = "Invalid email or password";
                        break;
                    case 432:
                        err = "Account does not exist";
                        break;
                    case 433:
                        err = "Invalid password";
                        break;
                    default:
                        err = "Internal error";
                }
                const error = new Error(err);
                throw error;
            })
            .then((responseData) =>
                dispatch({
                    type: USER_LOGIN_FULFILLED,
                    payload: responseData,
                })
            )
            .catch((error) =>
                dispatch({
                    type: USER_LOGIN_REJECTED,
                    payload: error,
                })
            );
    };
};

export const userRegister = (data) => {
    return (dispatch) => {
        return fetch(`${API_URL}user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
                let err;
                switch (response.status) {
                    case 400:
                        err = "Connection failed";
                        break;
                    case 431:
                        err = "Invalid email or password has not at least 6 characters";
                        break;
                    case 432:
                        err = "Email already used";
                        break;
                    case 433:
                        err = "Nickname already used";
                        break;
                    case 434:
                        err = "Access code incorrect";
                        break;
                    default:
                        err = "Internal error";
                }
                const error = new Error(err);
                throw error;
            })
            .then((responseData) =>
                dispatch({
                    type: USER_REGISTER_FULFILLED,
                    payload: responseData,
                })
            )
            .catch((error) =>
                dispatch({
                    type: "ERROR",
                    payload: error,
                })
            );
    };
};

export const userLogout = () => {
    return (dispatch) => {
        dispatch({ type: USER_LOGOUT });
    };
};
