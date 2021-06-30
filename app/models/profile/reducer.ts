import {
    FRIEND_ACTION_FULFILLED,
    USER_POSITION_FULFILLED,
    USER_PROFILE_UPDATE_FULFILLED,
    USER_FRIENDS_POSITION_FULFILLED,
    FRIENDS_DATA_FULFILLED,
} from "./actions";

export type PositionObject = {
    latitude: number;
    longitude: number;
    date: string;
};

type FriendPositionsObject = {
    name: string;
    position: PositionObject;
};

type FriendsObject = {
    name: string;
    email: string;
    position: PositionObject;
};

export type HistoryObject = {
    title: string;
    creatorName: string;
    date: string;
};

export type ProfileProps = {
    userId: string;
    name: string;
    fullName: string;
    email: string;
    address: string;
    description: string;
    friends: FriendsObject[];
    friendsPositions: FriendPositionsObject[];
    position: PositionObject;
    history: HistoryObject[];
};

const initialState: ProfileProps = {
    userId: "",
    name: "",
    fullName: "",
    email: "",
    address: "",
    description: "",
    friends: [],
    friendsPositions: [],
    position: {
        latitude: 0,
        longitude: 0,
        date: "",
    },
    history: [],
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_PROFILE_UPDATE_FULFILLED:
            return {
                ...state,
                ...action.payload,
            };
        case USER_POSITION_FULFILLED:
            return {
                ...state,
                position: {
                    latitude: action.payload.latitude,
                    longitude: action.payload.longitude,
                    date: action.payload.date,
                },
            };
        case FRIEND_ACTION_FULFILLED:
            return {
                ...state,
                ...action.payload,
            };
        case USER_FRIENDS_POSITION_FULFILLED:
            return {
                ...state,
                friendsPositions: action.payload,
            };
        case FRIENDS_DATA_FULFILLED:
            return {
                ...state,
                friends: action.payload,
            };

        default:
            return state;
    }
};

export { profileReducer };
