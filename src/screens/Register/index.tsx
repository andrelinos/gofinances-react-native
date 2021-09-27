import React, { useState } from 'react';

import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { Input } from '../../components/Form/Input';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';

import { CategorySelect } from '../CategorySelect';

import {
    Container,
    Header,
    Title,
    Form,
    FieldsContainer,
    TransactionButtonsContainer
} from './styles';
import { Modal } from 'react-native';

export function Register() {
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Category'
    });

    function handleTransactionTypeSelect(type: 'income' | 'outcome') {
        setTransactionType(type);
    }

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true);
    }

    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false);
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
                    <CategorySelectButton
                        title="Categoria"
                        onPress={handleOpenSelectCategoryModal}
                    />
                </FieldsContainer>

                <Button title="Enviar" />
            </Form>

            <Modal visible={categoryModalOpen}>
                <CategorySelect
                    category={category}
                    setCategory={setCategory}
                    closeSelectCategory={handleCloseSelectCategoryModal}
                />
            </Modal>
        </Container>
    );
}
