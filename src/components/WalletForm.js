import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { currenciesSave } from '../redux/actions/index';

class WalletForm extends Component {
  constructor() {
    super();

    // this.state = {
    //   currencies: [],
    // };

    this.getCurrencies = this.getCurrencies.bind(this);
  }

  componentDidMount() {
    this.getCurrencies();
  }

  async getCurrencies() {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const result = await response.json();
    const currenciesKeys = Object.keys(result);
    // const currenciesValues = Object.values(result);
    const currencies = [];
    for (let index = 0; index < currenciesKeys.length; index += 1) {
      const USDT = 'USDT';
      if (currenciesKeys[index] !== USDT) {
        currencies.push(currenciesKeys[index]);
      }
    }
    console.log(currencies);
    // currencies = Object.values(result);
    // this.setState({
    //   currencies,
    // }, () => {
    //   const { dispatch } = this.props;
    //   dispatch(currenciesSave(currencies));
    // });
    const { dispatch } = this.props;
    dispatch(currenciesSave(currencies));
  }

  render() {
    // const { currencies } = this.state;
    const { wallet: { currencies } } = this.props;
    return (
      <div>
        <label htmlFor="input-value">
          Valor:
          <input data-testid="value-input" name="input-value" />
        </label>

        <label htmlFor="input-description">
          Descrição:
          <input data-testid="description-input" name="input-description" />
        </label>

        <label htmlFor="select-currency">
          Moeda:
          <select data-testid="currency-input" name="select-currency">
            {currencies
              .map((currency, index) => <option key={ index }>{currency}</option>)}
          </select>
        </label>

        <label htmlFor="select-method">
          Método de Pagamento:
          <select data-testid="method-input" name="select-method">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="select-category">
          Tag:
          <select data-testid="tag-input" name="select-category">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  // currencies: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     code: PropTypes.string.isRequired,
  //   }).isRequired,
  // ).isRequired,
  wallet: PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});

export default connect(mapStateToProps)(WalletForm);
