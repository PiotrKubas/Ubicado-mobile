import React, { useState } from "react";
import { View, TouchableOpacity, SafeAreaView } from "react-native";
import { userRegister } from "../../models/user/actionCreators";
import { useAppDispatch } from "../../hooks";
import { showMessage } from "react-native-flash-message";
import { Logo, Container, LoginForm, FormInput, LoginButton } from "../Login/Login.style";

const Register = ({ navigation }) => {
    const dispatch = useAppDispatch();
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
        access: "",
    });

    const signupClicked = () => {
        const { name, email, password, access } = inputs;
        const data = { name, email, password, access };
        dispatch(userRegister(data)).then((responseData) => {
            if (responseData.payload.userId) navigation.navigate("Meetings", {});
            else
                showMessage({
                    icon: "danger",
                    message: responseData.payload.message,
                    type: "danger",
                    duration: 5000,
                });
        });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <Logo style={{ elevation: 5 }}>Ubicado</Logo>
            <Container>
                <View>
                    <LoginForm>
                        <FormInput
                            style={{ elevation: 20 }}
                            placeholder="Name"
                            returnKeyType={"next"}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(text) => {
                                setInputs({ ...inputs, name: text });
                            }}
                        />
                        <FormInput
                            style={{ elevation: 20 }}
                            keyboardType="email-address"
                            placeholder="Email"
                            returnKeyType={"next"}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(text) => {
                                setInputs({ ...inputs, email: text });
                            }}
                        />
                        <FormInput
                            style={{ elevation: 20 }}
                            placeholder="Password"
                            secureTextEntry={true}
                            autoCorrect={false}
                            onChangeText={(text) => {
                                setInputs({ ...inputs, password: text });
                            }}
                        />
                        <FormInput
                            style={{ elevation: 20 }}
                            placeholder="Access Code"
                            autoCorrect={false}
                            onChangeText={(text) => {
                                setInputs({ ...inputs, access: text });
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => signupClicked()}
                            style={{ width: 220, alignSelf: "center" }}
                        >
                            <LoginButton style={{ elevation: 30 }}>SIGNUP</LoginButton>
                        </TouchableOpacity>
                    </LoginForm>
                </View>
            </Container>
        </SafeAreaView>
    );
};

export default Register;
