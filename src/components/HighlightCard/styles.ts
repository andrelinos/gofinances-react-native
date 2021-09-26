import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

type CardTypeProps = {
    type: 'income' | 'outcome' | 'total';
};

export const Container = styled.View<CardTypeProps>`
    background-color: ${({ theme, type }) =>
        type === 'total' ? theme.colors.secondary : theme.colors.shape};
    width: ${RFValue(300)}px;
    border-radius: ${RFValue(5)}px;
    padding: ${RFValue(19)}px ${RFValue(23)}px;
    padding-bottom: ${RFValue(42)}px;

    margin-right: ${RFValue(16)}px;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const Title = styled.Text<CardTypeProps>`
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;

    color: ${({ theme, type }) =>
        type === 'total' ? theme.colors.shape : theme.colors.text_dark};
`;

export const Icon = styled(Feather)<CardTypeProps>`
    font-size: ${RFValue(40)}px;

    ${({ type }) =>
        type === 'income' &&
        css`
            color: ${({ theme }) => theme.colors.success};
        `}

    ${({ type }) =>
        type === 'outcome' &&
        css`
            color: ${({ theme }) => theme.colors.attention};
        `}
    
    ${({ type }) =>
        type === 'total' &&
        css`
            color: ${({ theme }) => theme.colors.shape};
        `}
`;

export const Footer = styled.View``;

export const Amount = styled.Text<CardTypeProps>`
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(32)}px;

    color: ${({ theme, type }) =>
        type === 'total' ? theme.colors.shape : theme.colors.text_dark};

    margin-top: ${RFValue(32)}px;
`;

export const LastTransaction = styled.Text<CardTypeProps>`
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(12)}px;

    color: ${({ theme, type }) =>
        type === 'total' ? theme.colors.shape : theme.colors.text};
`;
