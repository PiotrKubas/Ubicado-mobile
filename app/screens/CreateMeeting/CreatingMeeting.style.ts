import styled from "styled-components/native";

const Title = styled.Text`
    align-self: center;
    font-size: 22px;
    font-weight: bold;
    padding-bottom: 20px;
`;

const TitleInput = styled.TextInput`
    align-self: center;
    border-width: 1px;
    border-color: #435dd3;
    background-color: #dabdc5;
    width: 90%;
    height: 50px;
    margin-top: 20px;
    border-radius: 10px;
    font-size: 18px;
    font-weight: bold;
`;

const DescriptionInput = styled(TitleInput)`
    height: 100px;
    font-size: 15px;
    justify-content: flex-start;
`;

const AddressInput = styled(TitleInput)`
    justify-content: flex-start;
`;

const HourSection = styled.View`
    width: 90%;
    align-self: center;
    margin-top: 20px;
    margin-bottom: 10px;
`;

const DateInput = styled(TitleInput)`
    width: 50px;
    justify-content: flex-start;
`;

const DateSection = styled(HourSection)``;

const CreateButton = styled.Text`
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
export {
    Title,
    TitleInput,
    DescriptionInput,
    AddressInput,
    HourSection,
    DateInput,
    DateSection,
    CreateButton,
};
