import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "./models/user/reducer";
import { meetingReducer } from "./models/meeting/reducer";
import { profileReducer } from "./models/profile/reducer";

const rootReducer = combineReducers({
    user: userReducer,
    profile: profileReducer,
    meeting: meetingReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export { store };
