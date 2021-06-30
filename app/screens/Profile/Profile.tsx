import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    StyleSheet,
} from "react-native";
import COLOR from "../../styles/Colors";
import { userLogout } from "../../models/user/actionCreators";
import { updateProfile } from "../../models/profile/actionCreators";
import { showMessage } from "react-native-flash-message";
import { BarChart } from "react-native-chart-kit";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ChartData } from "react-native-chart-kit/dist/HelperTypes";
import { HistoryObject } from "../../models/profile/reducer";
import { Separator } from "../../components/Separator";

const styles = StyleSheet.create({
    logoutButton: {
        backgroundColor: COLOR.WHITE,
        color: COLOR.BLACK,
        borderColor: COLOR.BLUE,
        borderWidth: 1,
        fontSize: 16,
        alignSelf: "center",
        paddingVertical: 15,
        paddingHorizontal: 50,
        textAlign: "center",
        borderRadius: 45,
        elevation: 20,
        marginTop: 5,
        marginBottom: 30,
    },
    saveButton: {
        backgroundColor: COLOR.LIGHT_RED,
        color: COLOR.BLACK,
        borderColor: COLOR.BLUE,
        borderWidth: 1,
        fontSize: 16,
        alignSelf: "center",
        paddingVertical: 15,
        paddingHorizontal: 50,
        textAlign: "center",
        borderRadius: 45,
        elevation: 20,
        marginTop: 15,
        width: "70%",
    },
    safeArea2: {
        flex: 1,
        backgroundColor: "#fafbff",
    },
    header: {
        padding: 10,
        textAlign: "center",
        color: "#4e122a",
        backgroundColor: COLOR.LIGHT_RED,
        fontSize: 40,
        fontFamily: "BrandonTextLigh",
        elevation: 10,
        width: "100%",
    },
    card: {
        alignSelf: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: COLOR.BLUE,
        backgroundColor: COLOR.GRAY,
        width: "85%",
        height: 50,
        marginBottom: 20,
        marginTop: 10,
        borderRadius: 10,
        elevation: 7,
        fontSize: 18,
    },

    card2: {
        alignSelf: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: COLOR.BLUE,
        backgroundColor: COLOR.GRAY,
        width: "85%",
        height: 100,
        marginBottom: 20,
        marginTop: 10,
        borderRadius: 10,
        elevation: 7,
        fontSize: 18,
    },
});

const chartConfig = {
    backgroundGradientFrom: "#f2deeb",
    backgroundGradientFromOpacity: 0.3,
    backgroundGradientTo: "#6e365a",
    backgroundGradientToOpacity: 0.6,
    color: (opacity = 1) => `rgba(12, 7, 50, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 1,
    decimalPlaces: 0,
    useShadowColorFromDataset: false, // optional
};

const Profile = ({ navigation }) => {
    const dispatch = useAppDispatch();
    const profile = useAppSelector((state) => state.profile);

    const [profileInputs, setProfileInputs] = useState({
        fullNameInput: profile.fullName,
        descriptionInput: profile.description,
        addressInput: profile.address,
    });
    const [historySorted, setHistorySorted] = useState<HistoryObject[]>([]);
    const [historyCounter, setHistoryCounter] = useState(0);

    useEffect(() => {
        const historyToDisplay = profile.history.filter(
            (item) => item.date < new Date().toISOString()
        );
        const historySorted = historyToDisplay.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setHistorySorted(historySorted);
        setHistoryCounter(historySorted.length);
    }, [profile.history]);

    const getChartData = useCallback(() => {
        let result = {};

        for (let i = 0; i < historySorted.length; ++i) {
            if (!result[historySorted[i].creatorName]) result[historySorted[i].creatorName] = 0;
            ++result[historySorted[i].creatorName];
        }

        const resultArray = Object.entries(result).map((item) => {
            return { name: item[0], counter: item[1] as number };
        });
        const sortedStatisticArray = resultArray
            .sort((a: any, b: any) => b.counter - a.counter)
            .slice(0, 3);
        const chartData: ChartData = {
            labels: [
                sortedStatisticArray[0]?.name || "",
                sortedStatisticArray[1]?.name || "",
                sortedStatisticArray[2]?.name || "",
            ],
            datasets: [
                {
                    data: [
                        sortedStatisticArray[0]?.counter || 0,
                        sortedStatisticArray[1]?.counter || 0,
                        sortedStatisticArray[2]?.counter || 0,
                    ],
                },
            ],
        };

        return chartData;
    }, [historySorted]);

    const logoutClicked = () => {
        dispatch(userLogout());
        navigation.navigate("Login");
    };

    const onUpdateProfile = () => {
        const profileData = {
            fullName: profileInputs.fullNameInput,
            description: profileInputs.descriptionInput,
            address: profileInputs.addressInput,
        };
        dispatch(updateProfile(profileData))?.then((response) => {
            if ((response.type = "user/USER_PROFILE_UPDATE_FULFILLED")) {
                showMessage({
                    icon: "success",
                    message: "Profile updated",
                    type: "success",
                    duration: 2000,
                });
            } else {
                showMessage({
                    icon: "danger",
                    message: "Something went wrong",
                    type: "danger",
                    duration: 2000,
                });
            }
        });
    };

    return (
        <SafeAreaView style={styles.safeArea2}>
            <ScrollView>
                <Text style={styles.header}>{profile.name}</Text>
                <Separator />

                <Text
                    style={{
                        width: "85%",
                        alignSelf: "center",
                        fontSize: 19,
                        fontWeight: "bold",
                        marginTop: 15,
                    }}
                >
                    Full name:
                </Text>
                <TextInput
                    style={styles.card}
                    placeholder={profile.fullName}
                    value={profileInputs.fullNameInput}
                    autoCorrect={false}
                    onChangeText={(text) => {
                        setProfileInputs({ ...profileInputs, fullNameInput: text });
                    }}
                />

                <Text
                    style={{
                        width: "85%",
                        alignSelf: "center",
                        fontSize: 19,
                        fontWeight: "bold",
                        marginTop: 15,
                    }}
                >
                    Description:
                </Text>
                <TextInput
                    style={styles.card2}
                    placeholder={profile.description}
                    multiline={true}
                    value={profileInputs.descriptionInput}
                    autoCorrect={false}
                    onChangeText={(text) => {
                        setProfileInputs({ ...profileInputs, descriptionInput: text });
                    }}
                />

                <Text
                    style={{
                        width: "85%",
                        alignSelf: "center",
                        fontSize: 19,
                        fontWeight: "bold",
                        marginTop: 15,
                    }}
                >
                    Address:
                </Text>
                <TextInput
                    style={styles.card}
                    placeholder={profile.address}
                    value={profileInputs.addressInput}
                    autoCorrect={false}
                    onChangeText={(text) => {
                        setProfileInputs({ ...profileInputs, addressInput: text });
                    }}
                />

                <TouchableOpacity style={{ marginTop: 10 }} onPress={() => onUpdateProfile()}>
                    <Text style={styles.saveButton}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ marginTop: 10 }} onPress={() => logoutClicked()}>
                    <Text style={styles.logoutButton}>Log out</Text>
                </TouchableOpacity>

                <Separator />
                <Text
                    style={{
                        width: "85%",
                        alignSelf: "center",
                        fontSize: 19,
                        fontWeight: "bold",
                        marginTop: 15,
                        textAlign: "center",
                    }}
                >
                    Statistics
                </Text>

                <View style={{ padding: 15 }}>
                    <Text
                        style={{
                            fontSize: 17,
                            marginBottom: 5,
                            alignSelf: "center",
                            fontWeight: "bold",
                        }}
                    >{`Number of participated meetings: ${historyCounter}`}</Text>
                    <Text style={{ fontSize: 17, marginBottom: -10, alignSelf: "center" }}>
                        Basing on meetings your best friends are:
                    </Text>
                </View>

                <BarChart
                    style={{
                        marginVertical: 25,
                        borderRadius: 16,
                        alignSelf: "center",
                    }}
                    data={getChartData()}
                    width={300}
                    height={220}
                    yAxisInterval={3}
                    fromZero={true}
                    chartConfig={chartConfig}
                    yAxisSuffix=""
                    yAxisLabel=""
                />

                <Separator />

                <Text
                    style={{
                        width: "85%",
                        alignSelf: "center",
                        fontSize: 19,
                        fontWeight: "bold",
                        marginTop: 15,
                        textAlign: "center",
                    }}
                >
                    History
                </Text>

                <View style={{ marginBottom: 20 }}>
                    {historySorted.map((item) => {
                        return (
                            <View
                                style={{
                                    ...styles.card2,
                                    justifyContent: "flex-start",
                                    height: 75,
                                }}
                            >
                                <View
                                    style={{
                                        backgroundColor: COLOR.LIGHT_RED,
                                        borderTopLeftRadius: 8.5,
                                        borderTopRightRadius: 8.5,
                                        height: 32,
                                        alignItems: "center",
                                        flexDirection: "row",
                                    }}
                                >
                                    <Text
                                        style={{ color: COLOR.WHITE, fontSize: 18, marginLeft: 5 }}
                                    >
                                        {item.creatorName}
                                    </Text>
                                    <Text
                                        style={{
                                            color: COLOR.WHITE,
                                            fontSize: 18,
                                            marginLeft: 5,
                                            position: "absolute",
                                            right: 10,
                                        }}
                                    >
                                        {item.date.slice(0, 10)}
                                    </Text>
                                </View>
                                <View style={{ margin: 8 }}>
                                    <Text
                                        ellipsizeMode="tail"
                                        numberOfLines={3}
                                        style={{ fontSize: 15 }}
                                    >
                                        {item.title}
                                    </Text>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;
