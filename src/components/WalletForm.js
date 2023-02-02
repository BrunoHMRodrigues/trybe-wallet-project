import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { expendureSave, fetchCurrencies } from '../redux/actions/index';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: '',
    };

    // this.getCurrencies = this.getCurrencies.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addExpendure = this.addExpendure.bind(this);
  }

  componentDidMount() {
    // this.getCurrencies();
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange({ target }) {
    const { name, value } = target;
    console.log(name);
    console.log(value);
    this.setState({
      [name]: value,
    });
  }

  // async getCurrencies() {
  //   const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  //   const result = await response.json();
  //   const currenciesKeys = Object.keys(result);
  //   const currencies = [];
  //   for (let index = 0; index < currenciesKeys.length; index += 1) {
  //     const USDT = 'USDT';
  //     if (currenciesKeys[index] !== USDT) {
  //       currencies.push(currenciesKeys[index]);
  //     }
  //   }
  //   const { dispatch } = this.props;
  //   dispatch(currenciesSave(currencies));
  // }

  async addExpendure() {
    const { dispatch, wallet: { expenses } } = this.props;
    // const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    // const result = await response.json();
    // const currenciesKeys = Object.keys(result);
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

      dispatch(expendureSave(
        [
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
        ],
      ));
    });
  }

  render() {
    const { currency, method, tag } = this.state;
    const { wallet: { currencies } } = this.props;
    return (
      <div>
        <label htmlFor="value">
          Valor:
          <input
            data-testid="value-input"
            name="value"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            name="description"
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

        <label htmlFor="category">
          Tag:
          <select
            data-testid="tag-input"
            name="category"
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

        <button
          type="button"
          onClick={ this.addExpendure }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  wallet: PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
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
