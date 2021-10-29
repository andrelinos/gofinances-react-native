import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import { useAuth } from '../../hooks/auth';

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
import { useTheme } from 'styled-components';

export function Header() {
    const { user, signOut } = useAuth();

    const theme = useTheme();

    return (
        <Container>
            <UserWrapper>
                <UserInfo>
                    <Photo source={{ uri: user.photo }} />
                    <User>
                        <UserGreeting>Olá, </UserGreeting>
                        <UserName>
                            {user.name}{' '}
                            {user.verified_email && (
                                <MaterialIcons
                                    name="verified"
                                    color={theme.colors.blue}
                                    size={12}
                                    backgroundColor={theme.colors.shape}
                                />
                            )}
                        </UserName>
                    </User>
                </UserInfo>
                <LogoutButton onPress={signOut}>
                    <Icon name="log-out" />
                </LogoutButton>
            </UserWrapper>
        </Container>
    );
}
