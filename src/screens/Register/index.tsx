import React from 'react';
import { Button } from '../../components/Form/Button';
import { Input } from '../../components/Form/Input';

import { Container, Header, Title, Form } from './styles';

export function Register() {
    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Input placeholder="Nome" />
                <Input placeholder="Preço" />
            </Form>

            <Button />
        </Container>
    );
}