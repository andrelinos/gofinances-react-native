import React from 'react';
import { render } from '@testing-library/react-native';

import { Profile } from '../../screens/Profile';

describe('Profile Screen', () => {
    // Para saber de o elemento existe
    it('should be correctly placeholder in user name input', () => {
        const { getByPlaceholderText } = render(<Profile />);

        const inputName = getByPlaceholderText('Nome');

        expect(inputName).toBeTruthy();
    });

    // Verifica se o item existe pelo ID específico do componente
    it('should be correctly placeholder in input user surname', () => {
        const { getByTestId } = render(<Profile />);

        const inputName = getByTestId('input-surname');

        expect(inputName.props.placeholder).toEqual('Sobrenome');
    });

    it('should be loaded user data', () => {
        const { getByTestId } = render(<Profile />);

        const inputName = getByTestId('input-name');
        const inputSurname = getByTestId('input-surname');

        expect(inputName.props.value).toEqual('John');
        expect(inputSurname.props.value).toEqual('Doe');
    });

    it('should be exist title correctly', () => {
        const { getByTestId } = render(<Profile />);

        const titleProfile = getByTestId('title-profile');

        expect(titleProfile.props.children).toContain('Profile');
    });
});
