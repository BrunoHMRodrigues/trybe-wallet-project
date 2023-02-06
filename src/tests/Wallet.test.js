import React from 'react';
// import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
// import {
//   fetchCurrencies,
//   fetchExchangeRates, expendureSave } from '../redux/actions/index';
// import mockData from './helpers/mockData';

const email = 'email-field';
const methodText = 'Cartão de crédito';
const tagText = 'Lazer';
const descriptionText = 'Coxinha';
const valueTestId = 'value-input';
const descriptionTestId = 'description-input';
const currencyTestId = 'currency-input';
const methodTestId = 'method-input';
const tagTestId = 'tag-input';
const buttonAddExpenseText = 'Adicionar despesa';
const buttonEditTestId = 'edit-btn';
const buttonDeleteTestId = 'delete-btn';
// const currencies = Object.keys(mockData);

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
  it('WalletForm is rendering inputs', async () => {
    const inputValue = screen.getByTestId(valueTestId);
    const inputDescription = screen.getByTestId(descriptionTestId);
    const selectCurrency = screen.getByTestId(currencyTestId);
    const selectMethod = screen.getByTestId(methodTestId);
    const selectTag = screen.getByTestId(tagTestId);
    const button = screen.getByText(buttonAddExpenseText);

    expect(inputValue).toBeInTheDocument();
    expect(inputValue.value).toBe('');
    expect(inputDescription).toBeInTheDocument();
    expect(inputDescription.value).toBe('');
    expect(selectCurrency).toBeInTheDocument(); // ver maneira para ver com fetch
    await waitFor(() => {
      userEvent.selectOptions(selectCurrency, 'USD');
    });
    userEvent.selectOptions(selectCurrency, 'USD');
    expect(selectCurrency.value).toBe('USD');

    expect(selectMethod).toBeInTheDocument();
    expect(selectMethod.value).toBe('Dinheiro');
    expect(selectTag).toBeInTheDocument();
    expect(selectTag.value).toBe('Alimentação');
    expect(button).toBeInTheDocument();
  });

  it('Page currency field is calling fetch and updating', async () => {

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

describe('Page is adding expense as intended', () => {
  it('Added expense is being rendered in table', async () => {
    const inputValue = screen.getByTestId(valueTestId);
    const inputDescription = screen.getByTestId(descriptionTestId);
    const selectCurrency = screen.getByTestId(currencyTestId);
    const selectMethod = screen.getByTestId(methodTestId);
    const selectTag = screen.getByTestId(tagTestId);
    const button = screen.getByText(buttonAddExpenseText);
    userEvent.type(inputValue, '10');
    expect(inputValue).toHaveValue('10');
    userEvent.type(inputDescription, descriptionText);
    expect(inputDescription).toHaveValue(descriptionText);
    await waitFor(() => {
      userEvent.selectOptions(selectCurrency, 'EUR');
    });
    expect(selectCurrency).toHaveValue('EUR');
    userEvent.selectOptions(selectMethod, methodText);
    expect(selectMethod).toHaveValue(methodText);
    userEvent.selectOptions(selectTag, tagText);
    expect(selectTag).toHaveValue(tagText);
    userEvent.click(button);
    await waitFor(() => {
      const firstEditButton = screen.queryByTestId(buttonEditTestId);
      const firstDeleteButton = screen.queryByTestId(buttonDeleteTestId);
      expect(firstEditButton).toBeInTheDocument();
      expect(firstDeleteButton).toBeInTheDocument();
    });
    const description = screen.getByRole('cell', { name: descriptionText });
    const tag = screen.getByRole('cell', { name: tagText });
    const method = screen.getByRole('cell', { name: methodText });
    const value = screen.getByRole('cell', { name: '10.00' });
    const currency = screen.getByRole('cell', { name: 'Euro/Real Brasileiro' });
    // const expenseRate = screen.getByRole('cell', { name: '?' });
    // const totalConverted = screen.getByRole('cell', { name: '?' });
    const currencyConversion = screen.getByRole('cell', { name: 'Real' });
    expect(description).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    // expect(expenseRate).toBeInTheDocument();
    // expect(totalConverted).toBeInTheDocument();
    expect(currencyConversion).toBeInTheDocument();
    const firstDeleteButton = screen.queryByTestId(buttonDeleteTestId);
    userEvent.click(firstDeleteButton);
    expect(firstDeleteButton).not.toBeInTheDocument();
  });
});

describe('Page is Editing expense as intended', () => {
  it('Expense is being edited as intended', async () => {
    const inputValue = screen.getByTestId(valueTestId);
    const inputDescription = screen.getByTestId(descriptionTestId);
    const selectCurrency = screen.getByTestId(currencyTestId);
    const selectMethod = screen.getByTestId(methodTestId);
    const selectTag = screen.getByTestId(tagTestId);
    const button = screen.getByText(buttonAddExpenseText);
    userEvent.type(inputValue, '10');
    userEvent.type(inputDescription, descriptionText);
    await waitFor(() => {
      userEvent.selectOptions(selectCurrency, 'EUR');
    });
    userEvent.selectOptions(selectMethod, methodText);
    userEvent.selectOptions(selectTag, tagText);
    userEvent.click(button);
    await waitFor(() => {
      const firstEditButton = screen.queryByTestId(buttonEditTestId);
      expect(firstEditButton).toBeInTheDocument();
    });
    const firstEditButton = screen.queryByTestId(buttonEditTestId);
    userEvent.click(firstEditButton);
    await waitFor(() => {
      const editExpenseButton = screen.queryByText('Editar despesa');
      expect(editExpenseButton).toBeInTheDocument();
    });
    userEvent.type(inputValue, '20');
    userEvent.type(inputDescription, descriptionText);
    userEvent.selectOptions(selectCurrency, 'USD');
    userEvent.selectOptions(selectMethod, 'Dinheiro');
    userEvent.selectOptions(selectTag, 'Trabalho');
    const editExpenseButton = screen.queryByText('Editar despesa');
    userEvent.click(editExpenseButton);
    const description = screen.getByRole('cell', { name: descriptionText });
    const tag = screen.getByRole('cell', { name: 'Trabalho' });
    const method = screen.getByRole('cell', { name: 'Dinheiro' });
    const value = screen.getByRole('cell', { name: '20.00' });
    const currency = screen.getByRole('cell', { name: 'Dólar Americano/Real Brasileiro' });
    // const expenseRate = screen.getByRole('cell', { name: '?' });
    // const totalConverted = screen.getByRole('cell', { name: '?' });
    const currencyConversion = screen.getByRole('cell', { name: 'Real' });
    expect(description).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    // expect(expenseRate).toBeInTheDocument();
    // expect(totalConverted).toBeInTheDocument();
    expect(currencyConversion).toBeInTheDocument();
  });
});

describe('Page is Deleting expense as intended', () => {
  it('Expense is being deleted as intended', async () => {
    const inputValue = screen.getByTestId(valueTestId);
    const inputDescription = screen.getByTestId(descriptionTestId);
    const selectCurrency = screen.getByTestId(currencyTestId);
    const selectMethod = screen.getByTestId(methodTestId);
    const selectTag = screen.getByTestId(tagTestId);
    const button = screen.getByText(buttonAddExpenseText);

    userEvent.type(inputValue, '10');
    userEvent.type(inputDescription, descriptionText);
    await waitFor(() => {
      userEvent.selectOptions(selectCurrency, 'EUR');
    });
    userEvent.selectOptions(selectMethod, methodText);
    userEvent.selectOptions(selectTag, tagText);
    userEvent.click(button);

    await waitFor(() => {
      // const firstEditButton = screen.queryByTestId(buttonEditTestId);
      // expect(firstEditButton).toBeInTheDocument();
      const editButtons = screen.queryAllByTestId(buttonEditTestId);
      expect(editButtons.length).toBe(1);
    });

    userEvent.type(inputValue, '20');
    userEvent.type(inputDescription, 'Refrigerante');
    await waitFor(() => {
      userEvent.selectOptions(selectCurrency, 'EUR');
    });
    userEvent.selectOptions(selectMethod, 'Cartão de débito');
    userEvent.selectOptions(selectTag, 'Trabalho');
    userEvent.click(button);

    await waitFor(() => {
      const editButtons = screen.queryAllByTestId(buttonEditTestId);
      expect(editButtons.length).toBe(2);
    });

    const deleteButtons = screen.queryAllByTestId(buttonDeleteTestId);
    userEvent.click(deleteButtons[1]);
    const newDeleteButtons = screen.queryAllByTestId(buttonDeleteTestId);
    expect(newDeleteButtons.length).toBe(1);
    const value = screen.queryByRole('cell', { name: '20.00' });
    expect(value).not.toBeInTheDocument();

    userEvent.click(newDeleteButtons[0]);
    const noDeleteButtons = screen.queryAllByTestId(buttonDeleteTestId);
    expect(noDeleteButtons.length).toBe(0);
  });
});
// });
