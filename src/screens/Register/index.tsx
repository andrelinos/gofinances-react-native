import React, { useState } from 'react';
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';

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
    amount: number;
}

const schema = Yup.object().shape({
    name: Yup.string()
    .required('Informe a descrição da transação')
    .min(2, 'A descrição deve ter no mínimo 2 caracteres'),
    amount: Yup.number()
        .typeError('Informe um valor numérico')
        .positive('Infome um valor positivo')
        .required('Informe o valor da transação')
});

export function Register() {
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria'
    });

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
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

    function handleRegister(form: FormDataProps) {
        if (!transactionType) {
            return Alert.alert('Selecione o tipo da transação');
        }

        if (category.key === 'category') {
            return Alert.alert('Selecione a categoria da transação');
        }

        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key
        };

        console.log(data);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>

                <Form>
                    <FieldsContainer>
                        <InputForm
                            name="name"
                            control={control}
                            placeholder="Descrição"
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />
                        <InputForm
                            name="amount"
                            control={control}
                            placeholder="Preço"
                            keyboardType="numeric"
                            error={errors.amount && errors.amount.message}
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

                    <Button
                        title="Enviar"
                        onPress={handleSubmit(handleRegister)}
                    />
                </Form>

                <Modal visible={categoryModalOpen}>
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseSelectCategoryModal}
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    );
}
