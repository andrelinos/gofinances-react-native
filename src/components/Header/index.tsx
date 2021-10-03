import React from 'react';

import {
    Container,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    LogoutButton,
    Icon
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
                <LogoutButton onPress={() => {}}>
                    <Icon name="log-out" />
                </LogoutButton>
            </UserWrapper>
        </Container>
    );
}
