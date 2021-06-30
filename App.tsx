import React from "react";
import { store } from "./app/store";
import { Provider } from "react-redux";
import AppWithNavigationState from "./app/router";
import FlashMessage from "react-native-flash-message";
import PositionManager from "./app/PositionManager";
import styled from "styled-components/native";

const AppWrapper = styled.View`
    flex: 1;
    flex-direction: column;
`;

const App = () => {
    return (
        <Provider store={store}>
            <AppWrapper>
                <AppWithNavigationState />
                <FlashMessage position="top" />
                <PositionManager />
            </AppWrapper>
        </Provider>
    );
};

export default App;
