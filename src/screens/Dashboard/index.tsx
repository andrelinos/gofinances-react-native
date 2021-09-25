import React from 'react';

import { Header } from '../../components/Header';
import { HighlightCard } from '../../components/HighlightCard';
import {
    TransactionCard,
    TransactionCardDataProps
} from '../../components/TransactionCard';

import {
    Container,
    HighlightCards,
    Transactions,
    TransactionTitle,
    TransactionsList
} from './styles';

export interface DataListProps extends TransactionCardDataProps {
    id: string;
}

export function Dashboard() {
    const data: DataListProps[] = [
        {
            id: '1',
            type: 'positive',
            title: 'Desenvolvimento de site',
            amount: '12.000,00',
            category: {
                name: 'Vendas',
                icon: 'dollar-sign'
            },
            date: '13/04/2021'
        },
        {
            id: '2',
            type: 'negative',
            title: 'Compra de carro',
            amount: '27.000,00',
            category: {
                name: 'Compras',
                icon: 'shopping-bag'
            },
            date: '13/04/2021'
        },
        {
            id: '3',
            type: 'positive',
            title: 'Desenvolvimento sistema',
            amount: '30.000,00',
            category: {
                name: 'Vendas',
                icon: 'dollar-sign'
            },
            date: '13/04/2021'
        },
        {
            id: '4',
            type: 'negative',
            title: 'Alugúel apartamento',
            amount: '1.000,00',
            category: {
                name: 'Moradia',
                icon: 'shopping-bag'
            },
            date: '13/04/2021'
        }
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
                <TransactionTitle>Histórico de transações</TransactionTitle>

                <TransactionsList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TransactionCard data={item} />
                    )}
                />
            </Transactions>
        </Container>
    );
}
