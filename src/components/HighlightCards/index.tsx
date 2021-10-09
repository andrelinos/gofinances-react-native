import React from 'react';

import {
    HighlightCard,
    HighlightCardProps
} from '../../components/HighlightCard';

import { Container } from './styles';

export function HighlightCards(data: HighlightCardProps) {
    return (
        <Container>
            <HighlightCard
                type={data.type}
                title="Entradas"
                amount={data.amount}
                lastTransaction={data.lastTransaction}
                data={data.data}            />
            <HighlightCard
                type={data.type}
                title="Saídas"
                amount={data.amount}
                lastTransaction={data.lastTransaction}
                data={data.data}  
            />
            <HighlightCard
                type={data.type}
                title="Total"
                amount={data.amount}
                lastTransaction={data.lastTransaction}
                data={data.data}  
            />
        </Container>
    );
}
