import React, { useState } from 'react';

import { categories } from '../../utils/categories';

import {
    Container,
    Head,
    Title,
    ButtonOption,
    IconOption,
    PopUpMenu,
    MenuItemButton,
    MenuItemTitle,
    Footer,
    Category,
    Amount,
    Icon,
    CategoryName,
    Date
} from './styles';

export interface TransactionCardDataProps {
    type: 'income' | 'outcome';
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface TransactionCardProps {
    data: TransactionCardDataProps;
}

export function TransactionCard({ data }: TransactionCardProps) {
    const [popupMenu, setPopUpMenu] = useState(false);
    const [category] = categories.filter((item) => item.key === data.category);

    function handlePopUpMenu() {
        setPopUpMenu(!popupMenu);
    }

    return (
        <Container>
            <Head>
                <Title>{data.name}</Title>

                <ButtonOption onPress={handlePopUpMenu}>
                    <IconOption name="dots-vertical" />
                </ButtonOption>

                {popupMenu && (
                    <PopUpMenu>
                        <MenuItemButton>
                            <MenuItemTitle>Editar</MenuItemTitle>
                        </MenuItemButton>

                        <MenuItemButton>
                            <MenuItemTitle>Apagar</MenuItemTitle>
                        </MenuItemButton>
                    </PopUpMenu>
                )}
            </Head>
            <Amount type={data.type}>
                {data.type === 'outcome' && '- '}
                {data.amount}
            </Amount>
            <Footer>
                <Category>
                    <Icon name={category.icon} />
                    <CategoryName>{category.name}</CategoryName>
                </Category>

                <Date>{data.date}</Date>
            </Footer>
        </Container>
    );
}
