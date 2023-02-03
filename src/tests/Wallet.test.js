import React from 'react';
// import userEvent from '@testing-library/user-event';
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

// describe('Test if Wallet page is working as intended', () => {
describe('Page is rendering Header as intended', () => {
  it('Header is rendering email and total expendure', () => {
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
});

describe('Page is rendering WalletForm as intended', () => {
  it('WalletForm is rendering inputs', () => {
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

  });
});

describe('Page is rendering Table as intended', () => {
  it('Table is rendering table headers', () => {
    const description = screen.getByRole('columnheader', { name: 'Descrição' });
    const tag = screen.getByRole('columnheader', { name: 'Tag' });
    const method = screen.getByRole('columnheader', { name: 'Método de pagamento' });
    const value = screen.getByRole('columnheader', { name: 'Valor' });
    const currency = screen.getByRole('columnheader', { name: 'Moeda' });
    const exchangeRate = screen.getByText('Câmbio utilizado');
    const convertedValue = screen.getByText('Valor convertido');
    const currencyConversion = screen.getByText('Moeda de conversão');
    const editAndDelete = screen.getByText('Editar/Excluir');

    expect(description).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(exchangeRate).toBeInTheDocument();
    expect(convertedValue).toBeInTheDocument();
    expect(currencyConversion).toBeInTheDocument();
    expect(editAndDelete).toBeInTheDocument();
  });
});
// });
