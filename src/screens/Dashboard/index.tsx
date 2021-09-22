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
                <HighlightCard />
                <HighlightCard />
                <HighlightCard />
            </HighlightCards>
        </Container>
    );
}
