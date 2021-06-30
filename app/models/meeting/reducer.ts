import {
    POST_USER_MEETING_FULFILLED,
    POST_USER_MEETING_REJECTED,
    GET_USER_MEETING_FULFILLED,
    GET_USER_MEETING_REJECTED,
    DELETE_USER_MEETING_FULFILLED,
    USER_FRIENDS_MEETINGS_FULFILLED,
    SET_MEETING_ATTENDANCE_FULFILLED,
} from "./actions";

import { PositionObject } from "../profile/reducer";

type ReactionsObject = {
    name: string;
    isComing: boolean;
};

export type MeetingProps = {
    creatorId: string;
    creatorName: string;
    title: string;
    date: string;
    description: string;
    address: string;
    position: PositionObject;
    reactions: ReactionsObject[];
};

const initialState = {
    userMeeting: null,
    friendsMeetings: [],
};

const meetingReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_USER_MEETING_FULFILLED:
            return {
                ...state,
                userMeeting: action.payload.title.length > 0 ? action.payload : null,
            };
        case POST_USER_MEETING_REJECTED:
            return {
                ...state,
                userMeeting: null,
            };

        case GET_USER_MEETING_FULFILLED:
            return {
                ...state,
                userMeeting: action.payload.title.length > 0 ? action.payload : null,
            };
        case GET_USER_MEETING_REJECTED:
            return {
                ...state,
                userMeeting: null,
            };

        case DELETE_USER_MEETING_FULFILLED:
            return {
                ...state,
                userMeeting: null,
            };

        case USER_FRIENDS_MEETINGS_FULFILLED:
            return {
                ...state,
                friendsMeetings: action.payload,
            };

        case SET_MEETING_ATTENDANCE_FULFILLED: {
            const filteredMeetings = state.friendsMeetings.filter(
                (meeting: MeetingProps) => meeting.creatorName !== action.payload.creatorName
            );
            return {
                ...state,
                friendsMeetings: filteredMeetings
                    ? [...filteredMeetings, action.payload]
                    : action.payload,
            };
        }

        default:
            return state;
    }
};

export { meetingReducer };
