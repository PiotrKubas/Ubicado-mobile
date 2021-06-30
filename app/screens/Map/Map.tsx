import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import COLOR from "../../styles/Colors";
import { useAppSelector } from "../../hooks";
const styles = StyleSheet.create({
    createMeetingButton: {
        height: 50,
        width: 150,
        backgroundColor: COLOR.GRAY,
        position: "absolute",
        alignSelf: "center",
        top: 20,
        borderRadius: 45,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLOR.BLUE,
    },
});

const Map = ({ navigation }) => {
    const [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
    });
    const [position, setPostition] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
    });

    const [creatingMode, setCreatingMode] = useState(false);
    const [creatingMarker, setCreatingMarker] = useState({
        latitude: 0,
        longitude: 0,
    });

    const userState = useAppSelector((state) => state.user);
    const meetingState = useAppSelector((state) => state.meeting);
    const profileState = useAppSelector((state) => state.profile);

    const { friendsPositions } = profileState;
    const { friendsMeetings, userMeeting } = meetingState;
    const today = new Date().toISOString();
    const actualFriendMeetings = friendsMeetings.filter((meeting) => meeting.date > today);

    useEffect(() => {
        Geolocation.getCurrentPosition(
            (position) => {
                setPostition({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                });

                setRegion({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                });

                setCreatingMarker({
                    latitude: position.coords.latitude + 0.002,
                    longitude: position.coords.longitude,
                });
            },
            (error) => {},
            { timeout: 30000, maximumAge: 15000 }
        );
    }, []);

    const handleCreateButton = () => {
        if (!creatingMode) setCreatingMode(true);
        else navigation.navigate("CreateMeeting", creatingMarker);
    };

    const handleSetPosition = (cords) => {
        setCreatingMarker(cords.nativeEvent.coordinate);
    };

    const onRegionChange = (region) => {
        setRegion(region);
    };

    return (
        <SafeAreaView>
            <MapView
                provider={PROVIDER_GOOGLE}
                onRegionChangeComplete={onRegionChange}
                style={{ width: "100%", height: "100%" }}
                region={region}
            >
                <Marker title={"Your position"} pinColor={"green"} coordinate={position} />
                {friendsPositions &&
                    friendsPositions.map((friend) => {
                        const formatedDate = friend.position.date
                            ? `${friend.position.date.slice(8, 10)}.${friend.position.date.slice(
                                  5,
                                  7
                              )}.${friend.position.date.slice(0, 4)}`
                            : "";
                        const lastSeen = friend.position.date
                            ? `  ${friend.position.date.slice(11, 16)}  /  ${formatedDate}`
                            : "";
                        return (
                            <Marker
                                title={friend.name}
                                pinColor={"blue"}
                                coordinate={friend.position}
                                description={`Last seen: ${lastSeen}`}
                            />
                        );
                    })}

                {actualFriendMeetings &&
                    actualFriendMeetings.map((meeting) => {
                        return (
                            <Marker
                                title={meeting.title}
                                pinColor={"yellow"}
                                coordinate={meeting.position}
                            />
                        );
                    })}

                {userMeeting && (
                    <Marker
                        title={userMeeting.title}
                        pinColor={"red"}
                        coordinate={userMeeting.position}
                    />
                )}

                {creatingMode && (
                    <Marker
                        pinColor={"red"}
                        draggable
                        coordinate={creatingMarker}
                        onDragEnd={(cords) => handleSetPosition(cords)}
                    />
                )}
            </MapView>
            {!userMeeting && (
                <TouchableOpacity
                    onPress={() => handleCreateButton()}
                    style={styles.createMeetingButton}
                >
                    <Text style={{ fontSize: 17 }}>{`${
                        creatingMode ? "CONFIRM" : "Create meeting"
                    }`}</Text>
                </TouchableOpacity>
            )}
        </SafeAreaView>
    );
};

export default Map;
