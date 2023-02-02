import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const email = 'email-input';
const password = 'password-input';

describe('Test if Login page is working as intended', () => {
  it('Page is rendering email and password emails', () => {
    renderWithRouterAndRedux(<App />);
    const login = screen.getByText('Login');
    const inputEmail = screen.getByTestId(email);
    const inputPassword = screen.getByTestId(password);
    expect(login).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
  });

  it('Page is rendering button', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByText('Entrar');
    expect(button).toBeInTheDocument();
  });

  it('Button is working as intended (testing disable)', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(email);
    const inputPassword = screen.getByTestId(password);
    const button = screen.getByText('Entrar');
    expect(button.disabled).toBe(true);
    userEvent.type(inputEmail, 'teste@test.com');
    userEvent.type(inputPassword, '123456');
    expect(button.disabled).toBe(false);
  });

  it('When button is clicked it update store and move to wallet page', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(email);
    const inputPassword = screen.getByTestId(password);
    const button = screen.getByText('Entrar');
    userEvent.type(inputEmail, 'teste@test.com');
    userEvent.type(inputPassword, '123456');
    expect(button.disabled).toBe(false);
    userEvent.click(button);
    expect(history.location.pathname).toBe('/carteira');
    const userEmail = screen.getByTestId('email-field');
    expect(userEmail).toBeInTheDocument();
  });
});
