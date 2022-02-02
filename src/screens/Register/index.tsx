import React, { useState } from 'react';
import { Modal, Keyboard, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import uuid from 'react-native-uuid';

import { USER_LOCAL_STORAGE_KEY } from 'react-native-dotenv';

import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';

import { InputForm } from '../../components/InputForm';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { CategorySelect } from '../CategorySelect';

import {
    Container,
    GhTouchableWithoutFeedback as GestureHandlerTouchableWithoutFeedback,
    Header,
    Title,
    Form,
    FieldsContainer,
    TransactionButtonsContainer
} from './styles';

type NavigationProps = {
    navigate: (Screen: string) => void;
};

export interface FormDataProps {
    name: string;
    amount: number;
}

const schema = Yup.object({
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

    const { user } = useAuth();

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria'
    });

    const navigation = useNavigation<NavigationProps>();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormDataProps>({
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

    async function handleRegister(form: FormDataProps) {
        if (!transactionType) {
            return Alert.alert('Selecione o tipo da transação');
        }

        if (category.key === 'category') {
            return Alert.alert('Selecione a categoria da transação');
        }

        const newTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: transactionType,
            category: category.key,
            date: new Date()
        };

        const dataKey = USER_LOCAL_STORAGE_KEY + `:${user.id}`;

        try {
            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];

            const dataFormatted = [...currentData, newTransaction];

            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

            reset();
            setTransactionType('');
            setCategory({
                key: 'category',
                name: 'Categoria'
            });

            navigation.navigate('Listagem');
        } catch (error) {
            console.error(error);
            Alert.alert('Não foi possível salvar');
        }
    }

    return (
        <Container>
            <GestureHandlerTouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                            testID="button-category"
                            title={category.name}
                            onPress={handleOpenSelectCategoryModal}
                        />
                    </FieldsContainer>

                    <Button
                        title="Enviar"
                        onPress={handleSubmit(handleRegister)}
                    />
                </Form>

                <Modal testID="modal-category" visible={categoryModalOpen}>
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseSelectCategoryModal}
                    />
                </Modal>
            </GestureHandlerTouchableWithoutFeedback>
        </Container>
    );
}
