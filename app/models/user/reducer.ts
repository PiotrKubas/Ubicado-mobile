import {
    USER_LOGIN_PENDING,
    USER_LOGIN_FULFILLED,
    USER_LOGIN_REJECTED,
    USER_REGISTER_FULFILLED,
    USER_LOGOUT,
    FRIEND_ACTION_FULFILLED,
    USER_POSITION_FULFILLED,
    USER_FRIENDS_POSITION_FULFILLED,
    USER_PROFILE_UPDATE_FULFILLED,
} from "./actions";

const initialState: UserProps = {
    id: 1,
    name: "",
    email: "",
    token: "",
    isPending: false,
    isPositionPending: false,
};

export type UserProps = {
    id: number;
    name: string;
    email: string;
    token: string;
    isPending: boolean;
    isPositionPending: boolean;
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_PENDING:
            return {
                ...state,
                isPending: true,
            };
        case USER_LOGIN_FULFILLED:
            return {
                ...state,
                token: action.payload.token,
                isPending: false,
            };

        case USER_LOGIN_REJECTED:
            return {
                ...state,
                isPending: false,
            };

        case USER_REGISTER_FULFILLED:
            return {
                ...state,
                profile: action.payload,
            };

        case USER_LOGOUT:
            return {
                ...initialState,
            };
        case USER_LOGIN_PENDING:
            return {
                ...state,
                isPending: true,
            };

        case FRIEND_ACTION_FULFILLED:
            return {
                ...state,
                profile: action.payload,
            };

        case USER_POSITION_FULFILLED:
            return {
                ...state,
                profile: action.payload,
            };

        case USER_FRIENDS_POSITION_FULFILLED:
            return {
                ...state,
                friendsPositions: action.payload,
            };

        case USER_PROFILE_UPDATE_FULFILLED:
            return {
                ...state,
                profile: action.payload,
            };

        default:
            return state;
    }
};

export { userReducer };
