import React from 'react';

import {
    Container,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';

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
                <Icon name="log-out" />
            </UserWrapper>
        </Container>
    );
}
