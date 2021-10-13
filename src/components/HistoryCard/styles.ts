import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface ContainerProps {
    color: string;
}

export const Container = styled.View<ContainerProps>`
    width: 100%;

    background-color: ${({ theme }) => theme.colors.shape};

    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: ${RFValue(13)}px ${RFValue(13)}px;
    border-radius: ${RFValue(5)}px;
    border-left-width: ${RFValue(5)}px;
    border-left-color: ${({ color }) => color};
    margin-bottom: ${RFValue(13)}px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(15)}px;
`;
export const Amount = styled.Text`
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: ${RFValue(15)}px;
`;
