import * as React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { setMeetingAttendance } from "../../models/meeting/actionCreators";
import Icon from "react-native-vector-icons/FontAwesome";
import COLOR from "../../styles/Colors";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Separator } from "../../components/Separator";

const styles = StyleSheet.create({
    card2: {
        alignSelf: "center",
        justifyContent: "center",
        borderWidth: 1,
        padding: 5,
        borderColor: COLOR.LIGHT_RED,
        backgroundColor: COLOR.LIGHT_RED,
        height: 30,
        marginBottom: 10,
        borderRadius: 10,
        elevation: 3,
        margin: 2,
    },
});

const MeetingDetails = ({ navigation }) => {
    const dispatch = useAppDispatch();
    const profile = useAppSelector((state) => state.profile);
    const meetingState = useAppSelector((state) => state.meeting);

    const { friendsMeetings, userMeeting } = meetingState;

    const displayMeeting =
        profile.name === navigation.state.params.creatorName
            ? userMeeting
            : friendsMeetings.find(
                  (meeting) => meeting.creatorName === navigation.state.params.creatorName
              );
    const { title, description, creatorName, date, address, reactions } = displayMeeting;
    const convertDate = `${date.slice(8, 10)}.${date.slice(5, 7)}.${date.slice(0, 4)}`;
    const convertTime = `${date.slice(11, 16)}`;

    const onReactionClicked = (isComing) => {
        const { creatorName, title, date } = navigation.state.params;
        const { name } = profile;

        const data = {
            creator: creatorName,
            name,
            isComing,
            title,
            date,
        };
        dispatch(setMeetingAttendance(data));
    };

    return (
        <ScrollView style={{ padding: 10 }}>
            <TouchableOpacity
                style={{
                    borderColor: "#000000",
                    borderWidth: 2,
                    height: 40,
                    width: 80,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                }}
                onPress={() => navigation.goBack()}
            >
                <Text style={{ fontSize: 17 }}>Back</Text>
            </TouchableOpacity>

            <Text style={{ alignSelf: "center", fontSize: 22, fontWeight: "bold", marginTop: 10 }}>
                {title}
            </Text>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginVertical: 20,
                }}
            >
                <View style={{ flexDirection: "row" }}>
                    <Icon
                        name="clock-o"
                        size={18}
                        color="#9c3baf"
                        style={{ marginRight: 8, marginTop: 14 }}
                    />
                    <Text style={{ fontSize: 19, fontWeight: "bold", marginTop: 10 }}>
                        {convertTime}
                    </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Icon
                        name="calendar"
                        size={18}
                        color="#9c3baf"
                        style={{ marginRight: 8, marginTop: 13 }}
                    />
                    <Text style={{ fontSize: 19, fontWeight: "bold", marginTop: 10 }}>
                        {convertDate}
                    </Text>
                </View>
            </View>
            <Separator />

            <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 15 }}>Created By:</Text>
            <Text style={{ fontSize: 15 }}>{creatorName}</Text>
            <Text style={{ fontSize: 18, marginTop: 30, fontWeight: "bold" }}>Description:</Text>
            <Text style={{ fontSize: 15 }}>{description}</Text>
            <Text style={{ fontSize: 18, marginTop: 30, fontWeight: "bold" }}>Address:</Text>
            <Text style={{ fontSize: 15, marginBottom: 20 }}>{address}</Text>
            <Separator />

            <Text style={{ fontSize: 18, marginTop: 15, fontWeight: "bold" }}>Joined:</Text>
            <View style={{ flexDirection: "row" }}>
                {reactions.map((reaction) => {
                    if (reaction.isComing)
                        return (
                            <View style={styles.card2}>
                                <Text style={{ color: "#fff" }}>{reaction.name}</Text>
                            </View>
                        );
                })}
            </View>
            <Text style={{ fontSize: 18, marginTop: 15, fontWeight: "bold" }}>Rejected:</Text>
            <View style={{ flexDirection: "row" }}>
                {reactions.map((reaction) => {
                    if (!reaction.isComing)
                        return (
                            <View style={styles.card2}>
                                <Text style={{ color: "#fff" }}>{reaction.name}</Text>
                            </View>
                        );
                })}
            </View>

            {profile.name !== creatorName && (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        marginTop: 30,
                        marginBottom: 20,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => onReactionClicked(true)}
                        style={{
                            backgroundColor: "#165100",
                            width: 130,
                            height: 50,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 90,
                        }}
                    >
                        <Text style={{ fontSize: 19, color: "#fff" }}>Join</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => onReactionClicked(false)}
                        style={{
                            backgroundColor: "#9a0000",
                            width: 130,
                            height: 50,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 90,
                        }}
                    >
                        <Text style={{ fontSize: 19, color: "#fff" }}>Reject</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
};

export default MeetingDetails;
