import {
    FRIEND_ACTION_FULFILLED,
    USER_FRIENDS_POSITION_FULFILLED,
    USER_POSITION_FULFILLED,
    USER_PROFILE_UPDATE_FULFILLED,
    FRIENDS_DATA_FULFILLED,
} from "./actions";

const API_URL = "https://ubicado.herokuapp.com/";

export const modifyFriends = (data, action) => {
    return (dispatch, getState) => {
        const { token } = getState().user;

        return fetch(`${API_URL}profile/friends`, {
            method: action,
            headers: {
                "Content-Type": "application/json",
                Bearer: `${token}`,
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    return response.json();
                }
                let err;
                switch (response.status) {
                    case 400:
                        err = "It is already your friend";
                        break;
                    case 401:
                        err = "User not found";
                        break;
                    default:
                        err = "Internal error";
                }
                const error = new Error(err);
                throw error;
            })
            .then((responseData) =>
                dispatch({
                    type: FRIEND_ACTION_FULFILLED,
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

export const sendPosition = (data) => {
    return (dispatch, getState) => {
        const { token } = getState().user;
        if (!token) return;

        return fetch(`${API_URL}profile/position`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Bearer: `${token}`,
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
                let err;
                switch (response.status) {
                    default:
                        err = "Internal error";
                }
                const error = new Error(err);
                throw error;
            })
            .then((responseData) =>
                dispatch({
                    type: USER_POSITION_FULFILLED,
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

export const getFriendsPositions = () => {
    return (dispatch, getState) => {
        const { token } = getState().user;

        if (!token) return;

        return fetch(`${API_URL}profile/friends-positions`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Bearer: `${token}`,
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
                let err;
                switch (response.status) {
                    default:
                        err = "Internal error";
                }
                const error = new Error(err);
                throw error;
            })
            .then((responseData) =>
                dispatch({
                    type: USER_FRIENDS_POSITION_FULFILLED,
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

export const saveProfileData = (data) => {
    return (dispatch, getState) => {
        dispatch({
            type: USER_PROFILE_UPDATE_FULFILLED,
            payload: data,
        });
    };
};

export const getFriendsData = () => {
    return (dispatch, getState) => {
        const { token } = getState().user;

        if (!token) return;

        return fetch(`${API_URL}profile/friends-info`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Bearer: `${token}`,
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
                let err;
                switch (response.status) {
                    default:
                        err = "Internal error";
                }
                const error = new Error(err);
                throw error;
            })
            .then((responseData) =>
                dispatch({
                    type: FRIENDS_DATA_FULFILLED,
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

export const updateProfile = (data) => {
    return (dispatch, getState) => {
        const { token } = getState().user;

        if (!token) return;

        return fetch(`${API_URL}profile/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Bearer: `${token}`,
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
                let err;
                switch (response.status) {
                    default:
                        err = "Internal error";
                }
                const error = new Error(err);
                throw error;
            })
            .then((responseData) =>
                dispatch({
                    type: USER_PROFILE_UPDATE_FULFILLED,
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
