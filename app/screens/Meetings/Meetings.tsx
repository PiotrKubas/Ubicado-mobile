import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, FlatList } from "react-native";
import COLOR from "../../styles/Colors";
import { deleteUserMeeting } from "../../models/meeting/actionCreators";
import Icon from "react-native-vector-icons/FontAwesome";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Separator } from "../../components/Separator";

const styles = StyleSheet.create({
    card: {
        alignSelf: "center",
        borderWidth: 1,
        borderColor: COLOR.BLUE,
        width: "97%",
        height: 50,
        marginTop: 20,
        borderRadius: 10,
        elevation: 20,
        fontSize: 17,
    },
    card2: {
        alignSelf: "center",
        borderWidth: 1,
        borderColor: COLOR.BLUE,
        backgroundColor: COLOR.WHITE,
        width: "85%",
        height: 120,
        marginBottom: 10,
        borderRadius: 10,
        elevation: 5,
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
    createButton: {
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
        marginBottom: 20,
    },
});

const Meetings = ({ navigation }) => {
    const dispatch = useAppDispatch();

    //useEffect(() => {}, )
    const meetingState = useAppSelector((state) => state.meeting);

    const { userMeeting, friendsMeetings } = meetingState;
    const today = new Date().toISOString();
    const actualFriendMeetings = friendsMeetings.filter((meeting) => meeting.date > today);

    const renderMeetings = (data) => {
        return (
            <TouchableOpacity
                style={styles.card2}
                onPress={() => navigation.navigate("MeetingDetails", data.item)}
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
                    <Icon name="calendar" size={18} color="#fff" style={{ margin: 8 }} />
                    <Text style={{ color: COLOR.WHITE, fontSize: 18, marginLeft: 5 }}>
                        {data.item.creatorName}
                    </Text>
                </View>
                <View style={{ margin: 8 }}>
                    <Text ellipsizeMode="tail" numberOfLines={3} style={{ fontSize: 15 }}>
                        {data.item.title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    const modifyMeeting = () => {
        userMeeting ? dispatch(deleteUserMeeting()) : navigation.navigate("Map");
    };

    return (
        <SafeAreaView style={styles.safeArea2}>
            <View style={{ backgroundColor: "#f3f4ff" }}>
                <Text style={{ fontSize: 20, alignSelf: "center", marginTop: 15 }}>
                    Your meeting:
                </Text>
                {userMeeting && (
                    <TouchableOpacity
                        style={{ ...styles.card, backgroundColor: COLOR.GRAY }}
                        onPress={() => navigation.navigate("MeetingDetails", userMeeting)}
                    >
                        <Text
                            ellipsizeMode="tail"
                            numberOfLines={1}
                            style={{ fontSize: 20, marginLeft: 10, marginTop: 8, marginRight: 10 }}
                        >
                            {userMeeting.title}
                        </Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity style={{ marginTop: 10 }} onPress={() => modifyMeeting()}>
                    <Text style={styles.createButton}>{userMeeting ? "Delete" : "Create"}</Text>
                </TouchableOpacity>
            </View>
            <Separator />
            <Text style={{ fontSize: 20, alignSelf: "center", marginTop: 15, marginBottom: 10 }}>
                Your friends meetings:
            </Text>
            <FlatList data={actualFriendMeetings} renderItem={renderMeetings} />
        </SafeAreaView>
    );
};

export default Meetings;
