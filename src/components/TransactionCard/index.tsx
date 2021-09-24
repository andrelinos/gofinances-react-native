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

interface DataProps {
    title: string;
    amount: string;
    category: CategoryProps;
    date: string;
}

interface TransactionCardProps {
    data: DataProps;
}

export function TransactionCard({ data }: TransactionCardProps) {
    return (
        <Container>
            <Title>{data.title}</Title>
            <Amount>{data.amount}</Amount>
            <Footer>
                <Category>
                    <Icon name="dollar-sign" />
                    <CategoryName>{data.category.name}</CategoryName>
                </Category>

                <Date>{data.date}</Date>
            </Footer>
        </Container>
    );
}
