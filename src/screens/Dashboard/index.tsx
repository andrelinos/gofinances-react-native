import React from 'react';

import { Container, HighlightCards } from './styles';
import { Header } from '../../components/Header';
import { HighlightCard } from '../../components/HighlightCard';
import { RFValue } from 'react-native-responsive-fontsize';

export function Dashbard() {
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
        </Container>
    );
}
