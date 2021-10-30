import styled from 'styled-components/native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
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

export const Head = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;

export const ButtonOption = styled.TouchableOpacity`
    padding: ${RFValue(1)}px;
`;

export const IconOption = styled(MaterialCommunityIcons)`
    font-size: ${RFValue(20)}px;
    color: ${({ theme }) => theme.colors.primary};
`;

export const PopUpMenu = styled.View`
    height: 72px;
    padding: ${RFValue(8)}px;
    position: absolute;
    top: 0;
    right: ${RFValue(22)}px;
    background: ${({ theme }) => theme.colors.shape};
    border: 1px solid ${({ theme }) => theme.colors.primary_light};
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border-top-right-radius: -80px;
    justify-content: space-between;
    z-index: 9;
`;

export const MenuItemButton = styled.TouchableOpacity`
    width: 100%;
    padding: ${RFValue(4)}px;
`;

export const MenuItemTitle = styled.Text`
    text-align: right;
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
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
