import React from 'react';

import { HighlightCard } from '../../components/HighlightCard';

import { Container } from './styles';

interface HighlightProps {
    amount: string;
    lastTransaction: string;
}

interface HighlightData {
    entries: HighlightProps;
    expensives: HighlightProps;
    total: HighlightProps;
}

export function HighlightCards(data: HighlightData) {

    console.log("entries");
    console.log(data);
    return (
        <Container>
            <HighlightCard
                type="income"
                title="Entradas"
                amount="20.50"
                lastTransaction="A alguns dias"
            />
            <HighlightCard
                type="outcome"
                title="Saídas"
                amount="20.50"
                lastTransaction="A alguns dias"
            />
            <HighlightCard
                type="total"
                title="Total"
                amount="20.50"
                lastTransaction="A alguns dias"
            />
        </Container>
    );
}
