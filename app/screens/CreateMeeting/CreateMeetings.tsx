import React, { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { createUserMeeting } from "../../models/meeting/actionCreators";
import { showMessage } from "react-native-flash-message";
import { useAppDispatch } from "../../hooks";
import {
    Title,
    TitleInput,
    DescriptionInput,
    AddressInput,
    HourSection,
    DateInput,
    DateSection,
    CreateButton,
} from "./CreatingMeeting.style";

const CreateMeeting = ({ navigation }) => {
    const dispatch = useAppDispatch();
    const [inputs, setInputs] = useState({
        titleInput: "",
        descriptionInput: "",
        addressInput: "",
        minuteInput: 0,
        hourInput: 0,
        dayInput: 0,
        monthInput: 0,
        yearInput: 0,
    });

    const createMeeting = () => {
        const {
            titleInput,
            descriptionInput,
            addressInput,
            yearInput,
            monthInput,
            dayInput,
            hourInput,
            minuteInput,
        } = inputs;
        const { params } = navigation.state;
        const position = { ...params };

        if (!titleInput || !descriptionInput || !addressInput) {
            showMessage({
                icon: "danger",
                message: "All fields have to be filled",
                type: "danger",
                duration: 2000,
            });
            return null;
        }

        if (minuteInput < 0 || minuteInput > 59) {
            showMessage({
                icon: "danger",
                message: "Incorrect minute",
                type: "danger",
                duration: 2000,
            });
            return null;
        }
        if (hourInput < 0 || hourInput > 23) {
            showMessage({
                icon: "danger",
                message: "Incorrect hour",
                type: "danger",
                duration: 2000,
            });
            return null;
        }

        if (dayInput < 1 || dayInput > 31) {
            showMessage({
                icon: "danger",
                message: "Incorrect day",
                type: "danger",
                duration: 2000,
            });
            return null;
        }

        if (monthInput < 1 || monthInput > 12) {
            showMessage({
                icon: "danger",
                message: "Incorrect month",
                type: "danger",
                duration: 2000,
            });
            return null;
        }
        if (yearInput < 1 || yearInput > 9999) {
            showMessage({
                icon: "danger",
                message: "Incorrect year",
                type: "danger",
                duration: 2000,
            });
            return null;
        }

        const utcDate = new Date(
            yearInput,
            monthInput - 1,
            dayInput,
            hourInput + 1,
            minuteInput
        ).toISOString();

        const data = {
            title: titleInput,
            description: descriptionInput,
            address: addressInput,
            position: position,
            date: utcDate,
        };

        dispatch(createUserMeeting(data)).then((responseData) => {
            if (responseData.payload.message) {
                showMessage({
                    icon: "danger",
                    message: responseData.payload.message,
                    type: "danger",
                    duration: 2000,
                });
            } else {
                navigation.navigate("Map");
                showMessage({
                    icon: "success",
                    message: "Meeting created",
                    type: "success",
                    duration: 2000,
                });
            }
        });
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <TouchableOpacity onPress={() => navigation.navigate("Map")}>
                    <Text style={{ margin: 10, fontSize: 15 }}>Back</Text>
                </TouchableOpacity>

                <Title>Create meeting</Title>

                <TitleInput
                    placeholder="Title"
                    autoCorrect={false}
                    onChangeText={(text) => {
                        setInputs({ ...inputs, titleInput: text });
                    }}
                />

                <DescriptionInput
                    placeholder="Description"
                    autoCorrect={false}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(text) => {
                        setInputs({ ...inputs, descriptionInput: text });
                    }}
                />

                <AddressInput
                    placeholder="Address"
                    autoCorrect={false}
                    onChangeText={(text) => {
                        setInputs({ ...inputs, addressInput: text });
                    }}
                />

                <HourSection>
                    <Text style={{ fontSize: 18 }}>Hour:</Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <DateInput
                            placeholder="00"
                            keyboardType={"numeric"}
                            autoCorrect={false}
                            onChangeText={(text) => {
                                setInputs({ ...inputs, hourInput: parseInt(text, 10) });
                            }}
                        />
                        <Text style={{ fontSize: 18 }}> : </Text>

                        <DateInput
                            placeholder="00"
                            keyboardType={"numeric"}
                            autoCorrect={false}
                            onChangeText={(text) => {
                                setInputs({ ...inputs, minuteInput: parseInt(text, 10) });
                            }}
                        />
                    </View>
                </HourSection>

                <DateSection>
                    <Text style={{ fontSize: 18 }}>Date:</Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <DateInput
                            placeholder="DD"
                            keyboardType={"numeric"}
                            autoCorrect={false}
                            onChangeText={(text) => {
                                setInputs({ ...inputs, dayInput: parseInt(text, 10) });
                            }}
                        />
                        <Text style={{ fontSize: 18 }}> / </Text>

                        <DateInput
                            placeholder="MM"
                            keyboardType={"numeric"}
                            autoCorrect={false}
                            onChangeText={(text) => {
                                setInputs({ ...inputs, monthInput: parseInt(text, 10) });
                            }}
                        />

                        <Text style={{ fontSize: 18 }}> / </Text>

                        <DateInput
                            placeholder="YYYY"
                            keyboardType={"numeric"}
                            autoCorrect={false}
                            onChangeText={(text) => {
                                setInputs({ ...inputs, yearInput: parseInt(text, 10) });
                            }}
                        />
                    </View>
                </DateSection>

                <TouchableOpacity style={{ marginTop: 10 }} onPress={() => createMeeting()}>
                    <CreateButton>Create</CreateButton>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CreateMeeting;
