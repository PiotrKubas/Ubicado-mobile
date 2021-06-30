/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */

import { render, screen, fireEvent } from 'test-utils';
import { RegisterScreen } from './index';

describe('Register', () => {
    it('Renders the component', () => {
        render(<RegisterScreen />);
        screen.getByText('Ubicado');
        screen.getByPlaceholderText('Name');
        screen.getByPlaceholderText('Email');
        screen.getByPlaceholderText('Password');
        screen.getByPlaceholderText('Access Code');
    });

    it('Displays users when search phrase is matching', async () => {
        renderWithProviders(<RegisterScreen />);
        fireEvent.change(screen.getByTestId('Name'), { target: { value: 'jan3212' } });
        fireEvent.change(screen.getByTestId('Email'), { target: { value: 'jan3221@gmail.com' } });
        fireEvent.change(screen.getByTestId('Password'), { target: { value: '3sdds!da' } });
        fireEvent.change(screen.getByTestId('Access Code'), { target: { value: 'Inz$20Z!' } });
        fireEvent.click(screen.getByText('SIGNUP'));
    });
});