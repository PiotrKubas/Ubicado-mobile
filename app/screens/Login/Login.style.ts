import styled from "styled-components/native";

const Logo = styled.Text`
    padding: 50px;
    align-self: center;
    color: #dabdc5;
    font-size: 50px;
    font-family: BrandonTextLigh;
`;

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: stretch;
`;

const LoginForm = styled.View`
    padding: 0px 20px;
    align-items: stretch;
`;

const FormInput = styled.TextInput`
    padding: 5px;
    margin-bottom: 10px;
    color: black;
    height: 40px;
    border-color: #435dd3;
    border-width: 1px;
    border-radius: 4px;
    background-color: #dabdc5;
`;

const LoginButton = styled.Text`
    background-color: white;
    border-color: #dabdc5;
    border-width: 1px;
    color: black;
    font-size: 16px;
    align-self: center;
    padding: 15px 50px;
    text-align: center;
    border-radius: 45px;
    width: 300px;
    margin: 8px 0px;
`;

export { Logo, Container, LoginForm, FormInput, LoginButton };
