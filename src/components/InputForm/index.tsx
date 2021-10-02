import React from 'react';
import { TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';

import { Input } from '../Form/Input';

import { Container, Error } from './styles';
import { FormDataProps } from '../../screens/Register';

interface InputFormProps extends TextInputProps {
    control: Control<FormDataProps>;
    name: 'name' | 'amount';
    error: string | undefined;
}

export function InputForm({ control, name, error, ...rest }: InputFormProps) {
    return (
        <Container>
            <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Input
                        onChangeText={onChange}
                        value={value as string}
                        {...rest}
                    />
                )}
                name={name}
            />
            {error && <Error>{error}</Error>}
        </Container>
    );
}
