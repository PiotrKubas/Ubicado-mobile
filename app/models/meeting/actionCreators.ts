import {
    POST_USER_MEETING_FULFILLED,
    POST_USER_MEETING_REJECTED,
    GET_USER_MEETING_FULFILLED,
    DELETE_USER_MEETING_FULFILLED,
    USER_FRIENDS_MEETINGS_FULFILLED,
    SET_MEETING_ATTENDANCE_FULFILLED,
} from "./actions";

const API_URL = "https://ubicado.herokuapp.com/";

export const createUserMeeting = (data) => {
    return (dispatch, getState) => {
        const { token } = getState().user;

        return fetch(`${API_URL}meeting`, {
            method: "POST",
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
                    case 401:
                        err = "You already have a meeting";
                        break;
                    default:
                        err = "Internal error";
                }
                const error = new Error(err);
                throw error;
            })
            .then((responseData) =>
                dispatch({
                    type: POST_USER_MEETING_FULFILLED,
                    payload: responseData,
                })
            )
            .catch((error) =>
                dispatch({
                    type: POST_USER_MEETING_REJECTED,
                    payload: error,
                })
            );
    };
};

export const getUserMeeting = () => {
    return (dispatch, getState) => {
        const { token } = getState().user;

        return fetch(`${API_URL}meeting`, {
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
                    type: GET_USER_MEETING_FULFILLED,
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

export const deleteUserMeeting = () => {
    return (dispatch, getState) => {
        const { token } = getState().user;

        return fetch(`${API_URL}meeting`, {
            method: "DELETE",
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
                    type: DELETE_USER_MEETING_FULFILLED,
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

export const getFriendsMeetings = () => {
    return (dispatch, getState) => {
        const { token } = getState().user;

        return fetch(`${API_URL}meeting/friends-meetings`, {
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
                    case 400:
                        err = "Connection failed";
                        break;
                    default:
                        err = "Internal error";
                }
                const error = new Error(err);
                throw error;
            })
            .then((responseData) =>
                dispatch({
                    type: USER_FRIENDS_MEETINGS_FULFILLED,
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

export const setMeetingAttendance = (data) => {
    return (dispatch, getState) => {
        const { token } = getState().user;

        return fetch(`${API_URL}meeting/reactions`, {
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
                    case 400:
                        err = "Connection failed";
                        break;
                    default:
                        err = "Internal error";
                }
                const error = new Error(err);
                throw error;
            })
            .then((responseData) =>
                dispatch({
                    type: SET_MEETING_ATTENDANCE_FULFILLED,
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
