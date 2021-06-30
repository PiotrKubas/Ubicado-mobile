import styled from "styled-components/native";

const FriendInput = styled.TextInput`
    align-self: center;
    border-width: 1px;
    border-color: #435dd3;
    background-color: #dabdc5;
    width: 97%;
    height: 50px;
    margin-top: 20px;
    border-radius: 10px;
    font-size: 17px;
`;

const AddButton = styled.Text`
    background-color: white;
    color: black;
    border-color: #435dd3;
    border-width: 1px;
    font-size: 16px;
    align-self: center;
    padding: 15px 50px;
    text-align: center;
    border-radius: 45px;
    margin-bottom: 20px;
`;

const FriendsText = styled.Text`
    font-size: 20px;
    align-self: center;
    margin-top: 15px;
    margin-bottom: 10px;
`;

export { FriendInput, AddButton, FriendsText };
