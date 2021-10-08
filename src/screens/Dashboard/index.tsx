import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { REACT_NATIVE_LOCALSTORAGE_KEY } from 'react-native-dotenv';

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import { Header } from '../../components/Header';

import { HighlightCards } from '../../components/HighlightCards';
import {
    TransactionCard,
    TransactionCardDataProps
} from '../../components/TransactionCard';

import {
    Container,
    Transactions,
    TransactionTitle,
    TransactionsList
} from './styles';

export interface DataListProps extends TransactionCardDataProps {
    id: string;
}

type HighlightProps = {
    total: string;
};

interface HighlightData {
    entries: HighlightProps;
    expensives: HighlightProps;
}

export function Dashboard() {
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<HighlightData>(
        {} as HighlightData
    );

    async function loadTransactions() {
        const dataKey = REACT_NATIVE_LOCALSTORAGE_KEY;
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        let entriesTotal = 0;
        let expensiveTotal = 0;

        const transactionsFormated: DataListProps[] = transactions.map(
            (item: DataListProps) => {
                if (item.type === 'income') {
                    entriesTotal += Number(item.amount);
                } else {
                    expensiveTotal += Number(item.amount);
                }

                const amount = Number(item.amount).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                });

                const date = Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit'
                }).format(new Date(item.date));

                return {
                    id: item.id,
                    name: item.name,
                    type: item.type,
                    category: item.category,
                    amount,
                    date
                };
            }
        );

        setTransactions(transactionsFormated);
        setHighlightData({
            entries: {
                total: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            },
            expensives: {
                total: expensiveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            }
        });
    }
    useEffect(() => {
        loadTransactions();
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadTransactions();
        }, [])
    );

    return (
        <Container>
            <Header />

            <HighlightCards />

            <Transactions>
                <TransactionTitle>Histórico de transações</TransactionTitle>

                <TransactionsList
                    data={transactions}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <TransactionCard data={item} />}
                />
            </Transactions>
        </Container>
    );
}
