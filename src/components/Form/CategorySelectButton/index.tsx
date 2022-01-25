import React from 'react';

import { Container, Category, Icon, IconFeather } from './styles';

interface CategorySelectButtonProps {
    title: string;
    icon?: string;
    onPress: () => void;
}

export function CategorySelectButton({
    title,
    icon,
    onPress,
    ...rest
}: CategorySelectButtonProps) {
    return (
        <Container onPress={onPress} {...rest}>
            {icon && <IconFeather name={icon} />}
            <Category>{title}</Category>
            <Icon name="chevron-down" />
        </Container>
    );
}
