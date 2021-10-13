import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

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