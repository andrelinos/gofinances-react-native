import styled, { css } from 'styled-components/native';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { InputProps } from '.';

export const Container = styled(TextInput)<InputProps>`
    width: 100%;
    padding: ${RFValue(16)}px ${RFValue(18)}px;

    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;

    color: ${({ theme }) => theme.colors.text_dark};
    background-color: ${({ theme }) => theme.colors.shape};
    border-radius: 5px;

    margin-bottom: ${RFValue(8)}px;

    border-width: 3px;
    border-color: transparent;

    ${({ active, theme }) =>
        active &&
        css`
            border-color: ${theme.colors.attention};
        `}
`;
