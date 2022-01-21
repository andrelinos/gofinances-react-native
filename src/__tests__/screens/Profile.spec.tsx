import React from 'react';
import { render } from '@testing-library/react-native';

import { Profile } from '../../screens/Profile';

// Para saber de o elemento existe
test('check if show correctly user input name placeholder', () => {
    const { getByPlaceholderText } = render(<Profile />);

    const inputName = getByPlaceholderText('Nome');

    expect(inputName).toBeTruthy();
});

// Verifica se o item existe pelo ID específico do componente
test('check if show correctly user input surname placeholder', () => {
    const { getByTestId } = render(<Profile />);

    const inputName = getByTestId('input-surname');

    expect(inputName.props.placeholder).toEqual('Sobrenome');
});

test('check if show correctly user input surname placeholder', () => {
    const { getByTestId } = render(<Profile />);

    const inputName = getByTestId('input-name');
    const inputSurname = getByTestId('input-surname');

    expect(inputName.props.value).toEqual('Andrelino');
    expect(inputSurname.props.value).toEqual('Silva');
});

test('check if title render correctly', () => {
    const { getByTestId } = render(<Profile />);

    const titleProfile = getByTestId('title-profile');

    expect(titleProfile.props.children).toContain('Profile');
});
