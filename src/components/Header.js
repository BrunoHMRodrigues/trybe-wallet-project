import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends Component {
  constructor() {
    super();

    this.handleTotal = this.handleTotal.bind(this);

    this.state = {
      currency: 'BRL',
    };
  }

  handleTotal(expenses) {
    let sum = 0;
    for (let index = 0; index < expenses.length; index += 1) {
      const { currency } = expenses[index];
      const { exchangeRates } = expenses[index];
      const cost = Number(expenses[index].value);
      const exchangeRate = exchangeRates[currency].ask;
      sum += cost * exchangeRate;
    }
    return (Math.round(sum * 100) / 100).toFixed(2);
  }

  render() {
    const { user: { email }, wallet: { expenses } } = this.props;
    const totalCost = this.handleTotal(expenses);
    const { currency } = this.state;
    return (
      <header>

        <div className="container-email">
          <p data-testid="email-field">
            `Email:
            {' '}
            {email}
            `
          </p>
        </div>

        <div className="container-total-cost">
          <p>
            Despesa Total: R$

          </p>
          <p data-testid="total-field">
            { totalCost }
          </p>
          <p data-testid="header-currency-field">
            {currency}
          </p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
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

export default connect(mapStateToProps)(Header);
