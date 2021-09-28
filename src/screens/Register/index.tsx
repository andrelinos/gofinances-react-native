import React, { useState } from 'react';
import { Modal } from 'react-native';
import { useForm } from 'react-hook-form';

import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { Input } from '../../components/Form/Input';
import { InputForm } from '../../components/InputForm';
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

interface FormDataProps {
    name: string;
    amount: string;
}

export function Register() {
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Category'
    });

    const { control, handleSubmit } = useForm();

    function handleTransactionTypeSelect(type: 'income' | 'outcome') {
        setTransactionType(type);
    }

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true);
    }

    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false);
    }

    function handleRegister(form: FormDataProps) {
        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key
        };
        console.log(data);
    }

    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <FieldsContainer>
                    <InputForm
                        name={'name'}
                        control={control}
                        placeholder="Nome"
                    />
                    <InputForm
                        name={'amount'}
                        control={control}
                        placeholder="Preço"
                    />
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
                        title={category.name}
                        onPress={handleOpenSelectCategoryModal}
                    />
                </FieldsContainer>

                <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
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
