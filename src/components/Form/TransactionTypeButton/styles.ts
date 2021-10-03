import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

interface IconPros {
    type: 'income' | 'outcome';
}

interface ContainerProps {
    isActive: boolean;
    type: 'income' | 'outcome';
}

export const Container = styled(RectButton)<ContainerProps>`
    width: 48%;
    border-radius: 5px;
    border: 1.5px solid ${({ theme }) => theme.colors.text};
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: ${RFValue(16)}px;

    ${({ isActive, type }) =>
        isActive &&
        type === 'income' &&
        css`
            background-color: ${({ theme }) => theme.colors.success_light};
            border-color: ${({ theme }) => theme.colors.success_light};
        `};

    ${({ isActive, type }) =>
        isActive &&
        type === 'outcome' &&
        css`
        background-color: ${({ theme }) => theme.colors.attention_light}
        border-color: ${({ theme }) => theme.colors.attention_light};
    `};
`;

export const Icon = styled(Feather)<IconPros>`
    font-size: ${RFValue(24)}px;
    margin-right: ${RFValue(12)}px;

    color: ${({ theme, type }) =>
        type === 'income' ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;

    color: ${({ theme }) => theme.colors.text_dark};
`;
