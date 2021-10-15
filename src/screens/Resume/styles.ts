import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
    BorderlessButton,
    TouchableWithoutFeedback
} from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
    width: 100%;
    height: 100%;
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const GhTouchableWithoutFeedback = styled(TouchableWithoutFeedback)`
    width: 100%;
    height: 100%;
`;

export const Header = styled.View`
    background-color: ${({ theme }) => theme.colors.primary};

    width: 100%;
    height: ${RFValue(113)}px;

    justify-content: flex-end;
    align-items: center;
    padding-bottom: ${RFValue(19)}px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
    color: ${({ theme }) => theme.colors.shape};
`;

export const Content = styled.ScrollView``;

export const ChartContainer = styled.View`
    width: 100%;
    align-items: center;
`;

export const MonthSelect = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: ${RFValue(24)}px;
`;

export const MonthSelectButton = styled(BorderlessButton)``;

export const SelectIcon = styled(Feather)`
font-size: ${RFValue(24)}px;
`;

export const Month = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(20)}px;
`;


