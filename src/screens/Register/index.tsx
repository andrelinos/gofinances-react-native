import React, { useState } from 'react';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { Input } from '../../components/Form/Input';

import {
    Container,
    Header,
    Title,
    Form,
    FieldsContainer,
    TransactionButtonsContainer
} from './styles';

export function Register() {
    const [transactionType, setTransactionType] = useState('');

    function handleTransactionTypeSelect(type: 'income' | 'outcome') {
        setTransactionType(type);
    }

    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <FieldsContainer>
                    <Input placeholder="Nome" />
                    <Input placeholder="Preço" />
                    <TransactionButtonsContainer>
                        <TransactionTypeButton
                            type="income"
                            title="Income"
                            isActive={transactionType === 'income'}
                            onPress={() =>
                                handleTransactionTypeSelect('income')
                            }
                        />
                        <TransactionTypeButton
                            type="outcome"
                            title="Outcome"
                            isActive={transactionType === 'outcome'}
                            onPress={() =>
                                handleTransactionTypeSelect('outcome')
                            }
                        />
                    </TransactionButtonsContainer>
                </FieldsContainer>

                <Button title="Cadastrar" />
            </Form>
        </Container>
    );
}
