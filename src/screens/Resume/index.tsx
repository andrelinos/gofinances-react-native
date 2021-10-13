import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_NATIVE_LOCALSTORAGE_KEY } from 'react-native-dotenv';

import { HistoryCard } from '../../components/HistoryCard';
import { categories } from '../../utils/categories';

import { Container, Header, Title } from './styles';

interface TransactionData {
    type: 'income' | 'outcome';
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface CategoryData {
    name: string;
    total: string;
    color: string;
}

export function Resume() {
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
        []
    );
    async function loadData() {
        const dataKey = REACT_NATIVE_LOCALSTORAGE_KEY;
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        const expensives = responseFormatted.filter(
            (expensive: TransactionData) => expensive.type === 'outcome'
        );

        const totalByCategory: CategoryData[] = [];

        categories.forEach((category) => {
            let categorySum = 0;

            expensives.forEach((expensive: TransactionData) => {
                if (expensive.category === category.key) {
                    categorySum += Number(expensives.amount);
                }
            });

            if (categorySum > 0) {
                const total = categorySum.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                });
                totalByCategory.push({
                    name: category.name,
                    color: category.color,
                    total
                });
            }
        });

        setTotalByCategories(totalByCategory);
    }

    useEffect(() => {
        loadData();
    }, []);

    console.log(totalByCategories)

    return (
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>

            {totalByCategories.map((item) => (
                <HistoryCard
                    title={item.name}
                    amount={item.total}
                    color={item.color}
                />
            ))}
        </Container>
    );
}
