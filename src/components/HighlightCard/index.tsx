import React from 'react';

import {
    Container,
    Header,
    Title,
    Icon,
    Footer,
    Amount,
    LastTransaction
} from './styles';

type HighlightProps = {
    total: string;
};

interface HighlightData {
    entries: HighlightProps;
    expensives: HighlightProps;
}

export interface HighlightCardProps {
    title: string;
    amount: string;
    lastTransaction: string;
    type: 'income' | 'outcome' | 'total';
    data: HighlightData;
}

const icon = {
    income: 'arrow-up-circle',
    outcome: 'arrow-down-circle',
    total: 'dollar-sign'
};

export function HighlightCard({
    type,
    title,
    amount,
    lastTransaction
}: HighlightCardProps) {
    return (
        <Container type={type}>
            <Header>
                <Title type={type}>{title}</Title>
                <Icon name={icon[type]} type={type} />
            </Header>

            <Footer>
                <Amount type={type}>{amount && `R$ ${amount}`}</Amount>
                <LastTransaction type={type}>
                    {lastTransaction && lastTransaction}
                </LastTransaction>
            </Footer>
        </Container>
    );
}
