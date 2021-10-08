import React from 'react';

import {
    HighlightCard,
    HighlightCardProps
} from '../../components/HighlightCard';

import { Container } from './styles';

export function HighlightCards() {
    const data: HighlightCardProps = HighlightCard;

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
