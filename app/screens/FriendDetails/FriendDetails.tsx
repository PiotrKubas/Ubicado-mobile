import * as React from "react";
import { Text, TouchableOpacity, SafeAreaView } from "react-native";
import styled from "styled-components/native";

const Panel = styled.View`
    align-self: center;
    justify-content: center;
    border-width: 1px;
    border-color: #435dd3;
    background-color: #efefef;
    width: 85%;
    height: 50px;
    margin-bottom: 20px;
    margin-top: 10px;
    border-radius: 10px;
    font-size: 18px;
    padding: 10px;
`;

const Title = styled.Text`
    width: 85%;
    align-self: center;
    font-size: 19px;
    font-weight: bold;
    margin-top: 15px;
`;

const Header = styled.Text`
    align-self: center;
    font-size: 22px;
    font-weight: bold;
    padding-bottom: 20px;
`;

const HigherPanel = styled(Panel)`
    height: 100px;
`;

const FriendDetails = ({ navigation }) => {
    const { address, description, email, fullName, name } = navigation.state.params.item;

    return (
        <SafeAreaView>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ margin: 10, fontSize: 15 }}>Back</Text>
            </TouchableOpacity>

            <Header>{name}</Header>

            <Title>Full name:</Title>

            <Panel>
                <Text>{fullName}</Text>
            </Panel>

            <Title>Description:</Title>

            <HigherPanel>
                <Text>{description}</Text>
            </HigherPanel>

            <Title>Address:</Title>

            <Panel>
                <Text>{address}</Text>
            </Panel>

            <Title>Email:</Title>

            <Panel>
                <Text>{email}</Text>
            </Panel>
        </SafeAreaView>
    );
};

export default FriendDetails;
