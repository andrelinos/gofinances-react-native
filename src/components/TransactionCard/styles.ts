import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface TransactionCardPros {
    type: 'income' | 'outcome';
}

export const Container = styled.View`
    background-color: ${({ theme }) => theme.colors.shape};
    border-radius: 5px;

    padding: ${RFValue(16)}px ${RFValue(24)}px;
    margin-bottom: ${RFValue(16)}px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;

export const Amount = styled.Text<TransactionCardPros>`
    margin-top: ${RFValue(2)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(20)}px;

    color: ${({ theme, type }) =>
        type === 'income' ? theme.colors.success : theme.colors.attention};
`;

export const Footer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin-top: ${RFValue(19)}px;
`;

export const Category = styled.View`
    flex-direction: row;

    align-items: center;
`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    color: ${({ theme }) => theme.colors.text};
`;

export const CategoryName = styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.text};
    margin-left: ${RFValue(17)}px;
`;

export const Date = styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.text};
`;
