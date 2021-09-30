import React from 'react';

import {
    Container,
    Title,
    Footer,
    Category,
    Amount,
    Icon,
    CategoryName,
    Date
} from './styles';

interface CategoryProps {
    key?: string;
    name: string;
    icon: string;
}

export interface TransactionCardDataProps {
    type: 'positive' | 'negative';
    title: string;
    amount: number;
    category: CategoryProps;
    date: string;
}

interface TransactionCardProps {
    data: TransactionCardDataProps;
}

export function TransactionCard({ data }: TransactionCardProps) {
    return (
        <Container>
            <Title>{data.title}</Title>
            <Amount type={data.type}>
                {data.type === 'negative' && '- '}
                {data.amount}
            </Amount>
            <Footer>
                <Category>
                    <Icon name={data.category.icon} />
                    <CategoryName>{data.category.name}</CategoryName>
                </Category>

                <Date>{data.date}</Date>
            </Footer>
        </Container>
    );
}
