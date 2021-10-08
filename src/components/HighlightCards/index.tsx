import React from 'react';

import {
    HighlightCard,
    HighlightCardProps
} from '../../components/HighlightCard';

import { Container } from './styles';

interface HighlightCardsProps extends HighlightCardProps {
    type: 'income' | 'outcome' | 'total';
}

export function HighlightCards() {
    const data: any = HighlightCard;

    return (
        <Container>
            <HighlightCard
                type={data.type}
                title="Entradas"
                amount={data.amount}
                lastTransaction={data.lastTransaction}
            />
            <HighlightCard
                type={data.type}
                title="Saídas"
                amount={data.amount}
                lastTransaction={data.lastTransaction}
            />
            <HighlightCard
                type={data.type}
                title="Total"
                amount={data.amount}
                lastTransaction={data.lastTransaction}
            />
        </Container>
    );
}
