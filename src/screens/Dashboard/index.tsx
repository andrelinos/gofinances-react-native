import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { USER_LOCAL_STORAGE_KEY } from 'react-native-dotenv';

import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';

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
    LoadContainer,
    Transactions,
    TransactionTitle,
    TransactionsList
} from './styles';

export interface DataListProps extends TransactionCardDataProps {
    id: string;
}

interface HighlightProps {
    amount: string;
    lastTransaction: string;
}

export interface HighlightData {
    entries: HighlightProps;
    expensives: HighlightProps;
    total: HighlightProps;
}

export function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<HighlightData>(
        {} as HighlightData
    );

    const theme = useTheme();
    const { user } = useAuth();

    function getLastTransactionDate(
        collection: DataListProps[],
        type: 'income' | 'outcome'
    ) {
        const lastTransaction = new Date(
            Math.max.apply(
                Math,
                collection
                    .filter((transaction) => transaction.type === type)
                    .map((transaction) => new Date(transaction.date).getTime())
            )
        );

        if (!isNaN(lastTransaction.getDate())) {
            return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
                'pt-BR',
                { month: 'long' }
            )}`;
        } else {
            return '0';
        }
    }

    async function loadTransactions() {
        const dataKey = USER_LOCAL_STORAGE_KEY + `:${user.id}`;
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        let entriesTotal = 0;
        let expensiveTotal = 0;

        const transactionsFormatted: DataListProps[] = transactions.map(
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

        setTransactions(transactionsFormatted);

        const lastTransactionEntries = getLastTransactionDate(
            transactions,
            'income'
        );
        const lastTransactionExpensives = getLastTransactionDate(
            transactions,
            'outcome'
        );

        const totalInterval =
            lastTransactionExpensives !== '0' || lastTransactionEntries !== '0'
                ? `01 a ${
                      lastTransactionExpensives === '0'
                          ? lastTransactionEntries
                          : lastTransactionExpensives
                  }`
                : 'N??o h?? transa????es';

        const total = entriesTotal - expensiveTotal;

        setHighlightData({
            entries: {
                amount: Number(entriesTotal).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction:
                    lastTransactionEntries === '0'
                        ? 'N??o h?? entradas'
                        : `??ltima entrada dia ${lastTransactionEntries}`
            },
            expensives: {
                amount: Number(expensiveTotal).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction:
                    lastTransactionExpensives === '0'
                        ? 'N??o h?? sa??das'
                        : `??ltima sa??da dia ${lastTransactionExpensives}`
            },
            total: {
                amount: Number(total).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: totalInterval
            }
        });

        setIsLoading(false);
    }
    useEffect(() => {
        loadTransactions();
        AsyncStorage.clear(); // Limpa dados
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadTransactions();
        }, [])
    );

    return (
        <Container>
            {isLoading ? (
                <LoadContainer>
                    <ActivityIndicator
                        color={theme.colors.primary}
                        size="large"
                    />
                </LoadContainer>
            ) : (
                <>
                    <Header />
                    <HighlightCards data={highlightData} />

                    <Transactions>
                        <TransactionTitle>
                            Hist??rico de transa????es
                        </TransactionTitle>

                        <TransactionsList
                            data={transactions}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TransactionCard data={item} />
                            )}
                        />
                    </Transactions>
                </>
            )}
        </Container>
    );
}
