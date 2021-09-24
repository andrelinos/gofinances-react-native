import React from 'react';

import {
    Container,
    HighlightCards,
    Transactions,
    TransactionTitle,
    TransactionsList
} from './styles';
import { Header } from '../../components/Header';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';

export function Dashbard() {
    const data = [
        {
            title: 'Desenvolvimento de site',
            amount: '12.000,00',
            category: {
                name: 'Vendas',
                icon: 'dollar-sign'
            },
            date: '13/04/2021'
        },
        {
            title: 'Compra de carro',
            amount: '27.000,00',
            category: {
                name: 'Compras',
                icon: 'dollar-sign'
            },
            date: '13/04/2021'
        },
        {
            title: 'Desenvolvimento sistema',
            amount: '30.000,00',
            category: {
                name: 'Vendas',
                icon: 'dollar-sign'
            },
            date: '13/04/2021'
        },
    ];
    return (
        <Container>
            <Header />
            <HighlightCards>
                <HighlightCard
                    type="up"
                    title="Entradas"
                    amount="17.400,00"
                    lastTransaction="Última entrada dia 13 de abril"
                />
                <HighlightCard
                    type="down"
                    title="Saídas"
                    amount="1.259,00"
                    lastTransaction="Última saída dia 14 de abril"
                />
                <HighlightCard
                    type="total"
                    title="Total"
                    amount="16.141,00"
                    lastTransaction="01 a 16 de abril"
                />
            </HighlightCards>

            <Transactions>
                <TransactionTitle>Listagem</TransactionTitle>

                <TransactionsList
                    data={data}
                    renderItem={({ item }) => (
                        <TransactionCard key={item} data={item} />
                    )}
                />
            </Transactions>
        </Container>
    );
}
