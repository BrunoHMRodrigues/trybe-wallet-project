import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends Component {
  constructor() {
    super();

    // const { wallet: { expenses } } = this.props;
    // let sum = 0;
    // sum += expenses.map((expense) => expense.value);

    this.handleTotal = this.handleTotal.bind(this);

    this.state = {
      totalCost: 0,
      currency: 'BRL',
    };
  }

  // componentDidMount() {
  //   this.handleTotal();
  // }

  handleTotal() {
    const { wallet: { expenses } } = this.props;
    let sum = 0;
    for (let index = 0; index < expenses.length; index += 1) {
      sum += Number(expenses.value);
    }
    this.setState({
      totalCost: sum,
    });
    return sum;
  }

  render() {
    const { user: { email } } = this.props;
    const { totalCost, currency } = this.state;
    // let sum = 0;
    // sum += expenses.map((expense) => expense.value);
    // console.log(sum);
    // this.setState({
    //   totalCost: sum,
    // });
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
            `Despesa Total: R$

          </p>
          <p data-testid="total-field">
            { totalCost }
            `
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
