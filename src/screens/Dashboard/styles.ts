import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
// import { getBottomSpace } from 'react-native-iphone-x-helper';

import { DataListProps } from './index';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Transactions = styled.View`
    flex: 1;
    padding: 0 ${RFValue(24)}px;

    margin-top: ${RFPercentage(12)}px;
`;

export const TransactionTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(18)}px;
    margin-bottom: ${RFValue(16)}px;
`;

export const TransactionsList = styled(
    FlatList as new () => FlatList<DataListProps>
).attrs({
    showsVerticalScrollIndicator: false
    // contentContainerStyle: {
    //     paddingBottom: getBottomSpace()
    // }
})`
    flex: 1;
`;

export const LoadContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;