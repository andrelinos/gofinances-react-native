import React from 'react';

import { HighlightCard } from '../../components/HighlightCard';
import { HighlightData } from '../../screens/Dashboard';

import { Container } from './styles';

interface HighlightCardsProps {
    data: HighlightData;
}

export function HighlightCards({ data }: HighlightCardsProps) {
    return (
        <Container>
            <HighlightCard
                type="income"
                title="Entradas"
                amount={data.entries.amount}
                lastTransaction={data.entries.lastTransaction}
            />
            <HighlightCard
                type="outcome"
                title="Saídas"
                amount={data.expensives.amount}
                lastTransaction={data.expensives.lastTransaction}
            />
            <HighlightCard
                type="total"
                title="Total"
                amount={data.total.amount}
                lastTransaction={data.total.lastTransaction}
            />
        </Container>
    );
}
