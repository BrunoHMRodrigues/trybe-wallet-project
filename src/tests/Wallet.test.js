import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const email = 'email-field';

beforeEach(() => {
  const initialEntries = ['/carteira'];
  const initialState = {
    user: {
      email: 'teste@teste.com',
    },
    wallet: {
      currencies: [],
      expenses: [],
      editor: false,
      idToEdit: 0,
    },
  };
  renderWithRouterAndRedux(<App />, { initialState, initialEntries });
//   history.push('/carteira');
});

describe('Test if Wallet page is working as intended', () => {
  it('Page is rendering Header as intended', () => {
    const userEmail = screen.getByTestId(email);
    const textExpendure = screen.getByText('Despesa Total: R$');
    const expendure = screen.getByTestId('total-field');
    const expendureCurrency = screen.getByTestId('header-currency-field');

    expect(userEmail).toBeInTheDocument();
    expect(userEmail.innerHTML).toContain('Email: teste@teste.com');
    expect(textExpendure).toBeInTheDocument();
    expect(expendure).toBeInTheDocument();
    expect(expendure.innerHTML).toContain('0.00');
    expect(expendureCurrency).toBeInTheDocument();
    expect(expendureCurrency.innerHTML).toContain('BRL');
  });

  it('Page is rendering WalletForm as intended', () => {
    const inputValue = screen.getByTestId('value-input');
    const inputDescription = screen.getByTestId('description-input');
    const selectCurrency = screen.getByTestId('currency-input');
    const selectMethod = screen.getByTestId('method-input');
    const selectTag = screen.getByTestId('tag-input');
    const button = screen.getByText('Adicionar despesa');

    expect(inputValue).toBeInTheDocument();
    expect(inputValue.value).toBe('');
    expect(inputDescription).toBeInTheDocument();
    expect(inputDescription.value).toBe('');
    expect(selectCurrency).toBeInTheDocument();
    expect(selectCurrency.value).toBe('');
    expect(selectMethod).toBeInTheDocument();
    expect(selectMethod.value).toBe('Dinheiro');
    expect(selectTag).toBeInTheDocument();
    expect(selectTag.value).toBe('Alimentação');
    expect(button).toBeInTheDocument();
  });

  it('Page currency field is calling fetch and updating', () => {
    // expect(fetch).toBeCalled();
  });
});
