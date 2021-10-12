import React from 'react';

import { HighlightCard } from '../../components/HighlightCard';
import { HighlightData } from '../../screens/Dashboard';

import { Container } from './styles';



export function HighlightCards(data: HighlightData) {

    data && console.log('HighlightData: '+ data.total);

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
