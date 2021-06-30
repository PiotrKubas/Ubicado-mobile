import React, { useState, useCallback, useMemo } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, FlatList } from "react-native";
import { modifyFriends } from "../../models/profile/actionCreators";
import Icon from "react-native-vector-icons/FontAwesome";
import { showMessage } from "react-native-flash-message";
import { FriendInput, AddButton, FriendsText } from "./Friends.style";
import { useAppDispatch, useAppSelector } from "../../hooks";
import styled from "styled-components/native";
import { Separator } from "../../components/Separator";
import { getFriendsPositions } from "../../models/profile/actionCreators";
import { getFriendsMeetings } from "../../models/meeting/actionCreators";

const FriendPanel = styled.TouchableOpacity`
    align-self: center;
    justify-content: center;
    border-width: 1px;
    border-color: #435dd3;
    background-color: #efefef;
    width: 85%;
    height: 50px;
    margin-bottom: 10px;
    border-radius: 10px;
`;

const DeleteButton = styled.TouchableOpacity`
    position: absolute;
    right: 10px;
    background-color: #dabdc5;
    width: 25px;
    height: 25px;
    align-items: center;
    justify-content: center;
    border-radius: 90px;
`;

const styles = StyleSheet.create({
    deleteButton: {},
});

const Friends = ({ navigation }) => {
    const [friendInput, setFriendInput] = useState("");
    const dispatch = useAppDispatch();
    const profile = useAppSelector((state) => state.profile);

    const getFriends = useCallback(() => {
        return profile.friends;
    }, [profile]);

    const handleAddFriend = () => {
        const data = {
            name: friendInput,
        };
        console.log(data);
        dispatch(modifyFriends(data, "PUT")).then((responseData) => {
            console.log(responseData);
            if (responseData.payload.message) {
                showMessage({
                    icon: "danger",
                    message: responseData.payload.message,
                    type: "danger",
                    duration: 2000,
                });
            }
            dispatch(getFriendsPositions());
            dispatch(getFriendsMeetings());
        });
    };
    const handleDeleteFriend = (item) => {
        const data = {
            name: item.item.name,
        };
        dispatch(modifyFriends(data, "DELETE")).then(() => {
            dispatch(getFriendsPositions());
            dispatch(getFriendsMeetings());
        });
    };

    const renderFriends = (item) => {
        return (
            <FriendPanel
                style={{ elevation: 7 }}
                onPress={() => navigation.navigate("FriendDetails", item)}
            >
                <Text style={{ fontSize: 20, marginLeft: 10 }}>{item.item.name}</Text>
                <DeleteButton onPress={() => handleDeleteFriend(item)}>
                    <Icon name="trash-o" size={15} color="#fff" style={{ margin: 5 }} />
                </DeleteButton>
            </FriendPanel>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fafbff" }}>
            <View style={{ backgroundColor: "#f3f4ff" }}>
                <Text style={{ fontSize: 20, alignSelf: "center", marginTop: 15 }}>
                    Add friend:
                </Text>

                <FriendInput
                    placeholder="Nickname"
                    autoCorrect={false}
                    onChangeText={(text) => {
                        setFriendInput(text);
                    }}
                />
                <TouchableOpacity style={{ marginTop: 10 }} onPress={() => handleAddFriend()}>
                    <AddButton>Add</AddButton>
                </TouchableOpacity>
            </View>

            <Separator />

            <FriendsText>Friends:</FriendsText>
            <FlatList data={getFriends()} renderItem={renderFriends} />
        </SafeAreaView>
    );
};

export default Friends;
