import React, { useCallback, useState } from 'react';
import { USER_LOCAL_STORAGE_KEY } from 'react-native-dotenv';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { subMonths, addMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';

import { HistoryCard } from '../../components/HistoryCard';
import { categories } from '../../utils/categories';

import {
    Container,
    Header,
    Title,
    Content,
    ChartContainer,
    MonthSelect,
    MonthSelectButton,
    SelectIcon,
    Month,
    LoadContainer
} from './styles';
import { useFocusEffect } from '@react-navigation/native';

interface TransactionData {
    type: 'income' | 'outcome';
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface CategoryData {
    key: string;
    name: string;
    total: number;
    totalFormatted: string;
    percent: string;
    color: string;
}

export function Resume() {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
        []
    );

    const theme = useTheme();

    function handelDateChange(action: 'prev' | 'next') {
        action === 'prev'
            ? setSelectedDate(subMonths(selectedDate, 1))
            : setSelectedDate(addMonths(selectedDate, 1));
    }

    async function loadData() {
        setIsLoading(true);
        
        const dataKey = USER_LOCAL_STORAGE_KEY;
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        const expensives = responseFormatted.filter(
            (expensive: TransactionData) =>
                expensive.type === 'outcome' &&
                new Date(expensive.date).getMonth() ===
                    selectedDate.getMonth() &&
                new Date(expensive.date).getFullYear() ===
                    selectedDate.getFullYear()
        );

        const expensivesTotal = expensives.reduce(
            (acumullator: number, expensive: TransactionData) => {
                return acumullator + expensive.amount;
            },
            0
        );

        const totalByCategory: CategoryData[] = [];

        categories.forEach((category) => {
            let categorySum = 0;

            expensives.forEach((expensive: TransactionData) => {
                if (expensive.category === category.key) {
                    categorySum += Number(expensive.amount);
                }
            });

            if (categorySum > 0) {
                const totalFormatted = categorySum.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                });

                const percent = `${(
                    (categorySum / expensivesTotal) *
                    100
                ).toFixed(1)}%`;

                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    color: category.color,
                    total: categorySum,
                    totalFormatted,
                    percent
                });
            }
        });

        setTotalByCategories(totalByCategory);
        setIsLoading(false);
    }

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [selectedDate])
    );

    return (
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>

            <Content
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingBottom: useBottomTabBarHeight()
                }}
            >
                <MonthSelect>
                    <MonthSelectButton onPress={() => handelDateChange('prev')}>
                        <SelectIcon name="chevron-left" />
                    </MonthSelectButton>
                    <Month>
                        {format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}
                    </Month>
                    <MonthSelectButton onPress={() => handelDateChange('next')}>
                        <SelectIcon name="chevron-right" />
                    </MonthSelectButton>
                </MonthSelect>

                {isLoading ? (
                    <LoadContainer>
                        <ActivityIndicator
                            color={theme.colors.primary}
                            size="large"
                        />
                    </LoadContainer>
                ) : (
                    <>
                        <ChartContainer>
                            <VictoryPie
                                colorScale={totalByCategories.map(
                                    (caregory) => caregory.color
                                )}
                                style={{
                                    labels: {
                                        fontSize: RFValue(18),
                                        fontWeight: 'bold',
                                        fill: theme.colors.shape
                                    }
                                }}
                                labelRadius={80}
                                labelPlacement="parallel"
                                data={totalByCategories}
                                x="percent"
                                y="total"
                            />
                        </ChartContainer>

                        {totalByCategories.map((item) => (
                            <HistoryCard
                                key={item.key}
                                title={item.name}
                                amount={item.totalFormatted}
                                color={item.color}
                            />
                        ))}
                    </>
                )}
            </Content>
        </Container>
    );
}
