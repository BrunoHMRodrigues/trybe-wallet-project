import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      totalCost: 0,
      currency: 'BRL',
    };
  }

  render() {
    const { user: { email } } = this.props;
    const { totalCost, currency } = this.state;
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
            {totalCost}
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
};

const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});

export default connect(mapStateToProps)(Header);
