import React, { useState } from "react";
import { View, TouchableOpacity, SafeAreaView, ActivityIndicator, Keyboard } from "react-native";
import { userLogin } from "../../models/user/actionCreators";
import { getUserMeeting, getFriendsMeetings } from "../../models/meeting/actionCreators";
import { saveProfileData, getFriendsData } from "../../models/profile/actionCreators";
import { showMessage } from "react-native-flash-message";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Logo, Container, LoginForm, FormInput, LoginButton } from "./Login.style";

const Login = ({ navigation }) => {
    const dispatch = useAppDispatch();
    const userState = useAppSelector((state) => state.user);

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const loginClicked = () => {
        const data = {
            email: inputs.email,
            password: inputs.password,
        };

        dispatch(userLogin(data)).then((responseData) => {
            if (responseData.payload.token) {
                dispatch(saveProfileData(responseData.payload.userProfile));
                dispatch(getFriendsMeetings());
                dispatch(getUserMeeting());
                dispatch(getFriendsData());
                navigation.navigate("Meetings", {});
            } else {
                showMessage({
                    icon: "danger",
                    message: responseData.payload.message,
                    type: "danger",
                    duration: 5000,
                });
            }
        });
    };

    const registerClicked = () => {
        navigation.navigate("Register", {});
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <Logo style={{ elevation: 5 }}>Ubicado</Logo>
            <Container>
                <View>
                    <LoginForm>
                        <FormInput
                            style={{ elevation: 20 }}
                            keyboardType="email-address"
                            editable={true}
                            placeholder="Email"
                            value={inputs.email}
                            returnKeyType={"next"}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(text) => {
                                setInputs({ ...inputs, email: text });
                            }}
                            blurOnSubmit={true}
                        />
                        <FormInput
                            style={{ elevation: 20 }}
                            placeholder="Password"
                            secureTextEntry={true}
                            onChangeText={(text) => {
                                setInputs({ ...inputs, password: text });
                            }}
                            blurOnSubmit={true}
                        />
                        <TouchableOpacity
                            style={{ width: 220, alignSelf: "center" }}
                            onPress={() => {
                                loginClicked();
                                Keyboard.dismiss();
                            }}
                        >
                            <LoginButton style={{ elevation: 30 }}>LOGIN</LoginButton>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => registerClicked()}
                            style={{ width: 220, alignSelf: "center" }}
                        >
                            <LoginButton style={{ elevation: 30 }}>SIGNUP</LoginButton>
                        </TouchableOpacity>
                    </LoginForm>
                    {userState.isPending && (
                        <ActivityIndicator
                            size="large"
                            color="#787878"
                            style={{
                                marginTop: 30,
                                position: "absolute",
                                alignSelf: "center",
                                bottom: -50,
                            }}
                        />
                    )}
                </View>
            </Container>
        </SafeAreaView>
    );
};

export default Login;
