import React from 'react';

import { HighlightCard } from '../../components/HighlightCard';

import { Container } from './styles';

type HighlightProps = {
    total: string;
};

interface HighlightCardProps {
    type: 'income' | 'outcome' | 'total';
    title: 'Entradas' | 'Saídas' | 'Total';
    amount: string;
    lastTransaction: string;
}

export function HighlightCards({
    type,
    amount,
    lastTransaction
}: HighlightCardProps) {
    return (
        <Container>
            <HighlightCard
                type={type}
                title="Entradas"
                amount={amount}
                lastTransaction={lastTransaction} 
           />
            <HighlightCard
                type={type}
                title="Saídas"
                amount={amount}
                lastTransaction={lastTransaction}
            />
            <HighlightCard
                type={type}
                title="Total"
                amount={amount}
                lastTransaction={lastTransaction}
  
            />
        </Container>
    );
}
