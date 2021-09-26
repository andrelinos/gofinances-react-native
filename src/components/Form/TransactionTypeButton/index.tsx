import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Icon, Title } from './styles';

const icon = {
    income: 'arrow-up-circle',
    outcome: 'arrow-down-circle'
};

interface TransactionTypeButtonProps extends TouchableOpacityProps {
    type: 'income' | 'outcome';
    title: string;
    isActive: boolean;
}

export function TransactionTypeButton({
    type,
    title,
    isActive,
    ...rest
}: TransactionTypeButtonProps) {
    return (
        <Container type={type} isActive={isActive} {...rest}>
            <Icon type={type} name={icon[type]} />
            <Title>{title}</Title>
        </Container>
    );
}
