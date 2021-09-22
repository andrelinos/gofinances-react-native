import React from 'react';
import { Text } from 'react-native';
import {
    Container,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName
} from './styles';

export function Header() {
    return (
        <Container>
            <UserWrapper>
                <UserInfo>
                    <Photo
                        source={{ uri: 'http://github.com/andrelinos.png' }}
                    />
                    <User>
                        <UserGreeting>Olá, </UserGreeting>
                        <UserName>Andrelino</UserName>
                    </User>
                </UserInfo>
            </UserWrapper>
        </Container>
    );
}
