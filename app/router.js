import * as React from "react";
import { Text } from "react-native";
import { Component } from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import Login from "./screens/Login/Login";
import Register from "./screens/Register";
import Meetings from "./screens/Meetings";
import Friends from "./screens/Friends";
import Profile from "./screens/Profile";
import MeetingDetails from "./screens/MeetingDetails";
import CreateMeeting from "./screens/CreateMeeting";
import FriendDetails from "./screens/FriendDetails";
import Map from "./screens/Map";
import COLOR from "./styles/Colors";
import NavigationService from "./NavigationService";

const HomeTabs = {
    Meetings: createStackNavigator({
        Meetings: {
            screen: Meetings,
            navigationOptions: {
                headerShown: false,
            },
        },
    }),
    Friends: createStackNavigator({
        Friends: {
            screen: Friends,
            navigationOptions: {
                headerShown: false,
            },
        },
    }),
    Map: createStackNavigator({
        Map: {
            screen: Map,
            navigationOptions: {
                headerShown: false,
            },
        },
    }),
    Profile: createStackNavigator({
        Meetings: {
            screen: Profile,
            navigationOptions: {
                headerShown: false,
            },
        },
    }),
};

const BottomTabNavigator = createBottomTabNavigator(HomeTabs, {
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarLabel: () => (
            <Text
                style={{
                    alignSelf: "center",
                    marginBottom: 12,
                    fontSize: 16,
                    color: COLOR.WHITE,
                    borderRadius: 20,
                }}
            >
                {navigation.state.routeName}
            </Text>
        ),
    }),
    lazy: false,
    tabBarOptions: {
        activeBackgroundColor: COLOR.LIGHT_RED,
        inactiveBackgroundColor: COLOR.LIGHTBLUE,
        tabStyle: {
            borderRightWidth: 1,
            borderLeftWidth: 1,
            borderRadius: 5,
            borderColor: COLOR.WHITE,
            elevation: 5,
        },
        style: {
            backgroundColor: COLOR.WHITE,
            width: "100%",
            alignSelf: "center",
        },
    },

    navigationOptions: {
        headerShown: false,
    },
});

const MainStack = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            headerShown: false,
        },
    },
    Register: {
        screen: Register,
        navigationOptions: {
            headerShown: false,
        },
    },
    Meetings: BottomTabNavigator,

    MeetingDetails: {
        screen: MeetingDetails,
        navigationOptions: {
            headerShown: false,
        },
    },

    CreateMeeting: {
        screen: CreateMeeting,
        navigationOptions: {
            headerShown: false,
        },
    },

    FriendDetails: {
        screen: FriendDetails,
        navigationOptions: {
            headerShown: false,
        },
    },
});

const Navigation = createAppContainer(MainStack);

class AppWithNavigationState extends Component {
    render() {
        return (
            <Navigation
                ref={(navigatorRef) => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                }}
            />
        );
    }
}
export default AppWithNavigationState;
