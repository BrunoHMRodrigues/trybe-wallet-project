import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchCurrencies,
  fetchExchangeRates, expendureSave } from '../redux/actions/index';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.addExpendure = this.addExpendure.bind(this);
    this.editExpendure = this.editExpendure.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async addExpendure() {
    const { dispatch, wallet: { expenses } } = this.props;
    this.setState({
      id: expenses.length,
    }, () => {
      const {
        id,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates,
      } = this.state;

      const expenseToSave = [
        ...expenses,
        {
          id,
          value,
          description,
          currency,
          method,
          tag,
          exchangeRates,
        },
      ];
      this.setState({
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: '',
      }, () => {
        dispatch(fetchExchangeRates(expenseToSave));
      });
    });
  }

  editExpendure() {
    const { dispatch, wallet: { expenses, idToEdit } } = this.props;
    const { id, exchangeRates } = expenses[idToEdit];
    const { value, description, currency, method, tag } = this.state;
    const editedExpense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    const newExpenses = [];
    for (let index = 0; index < expenses.length; index += 1) {
      if (index === idToEdit) {
        newExpenses.push(editedExpense);
      } else {
        newExpenses.push(expenses[index]);
      }
    }
    dispatch(expendureSave(newExpenses));
  }

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const { wallet: { currencies, editor } } = this.props;
    return (
      <div>
        <label htmlFor="value">
          Valor:
          <input
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="currency">
          Moeda:
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies
              .map((currencyTag, index) => <option key={ index }>{currencyTag}</option>)}
          </select>
        </label>

        <label htmlFor="method">
          Método de Pagamento:
          <select
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Tag:
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>

        {(editor) ? (
          <button
            type="button"
            onClick={ this.editExpendure }
          >
            Editar despesa
          </button>
        ) : (
          <button
            type="button"
            onClick={ this.addExpendure }
          >
            Adicionar despesa
          </button>
        )}
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  wallet: PropTypes.shape({
    idToEdit: PropTypes.number.isRequired,
    currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    editor: PropTypes.bool.isRequired,
    expenses: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
      method: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
      exchangeRates: PropTypes.string.isRequired,
    })),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});

export default connect(mapStateToProps)(WalletForm);
