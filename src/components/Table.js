import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Table extends Component {
  render() {
    const { wallet: { expenses } } = this.props;
    return (
      <div>
        <div>Table</div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>

          <tbody>
            {/* {expenses.map((expense, index) => (
              <tr key={ index }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{expense.value}</td>
                <td>{expense.exchangeRates(expense.currency).name}</td>
                <td>{Number(expense.exchangeRates(expense.currency).ask)}</td>
                <td>{Number(expense.value) * Number(expense.exchangeRates(expense.currency).ask)}</td>
                <td>Real</td>
                <td>
                  <button type="button">Editar</button>
                  <button type="button">Excluir</button>
                </td>
              </tr>
            ))} */}

            {expenses.map((expense, index) => {
              const { description, tag, method, value } = expense;
              const valueFormated = (Math.round(value * 100) / 100).toFixed(2);
              const currencyName = expense.exchangeRates[expense.currency].name;
              const exchangeRate = Number(expense.exchangeRates[expense.currency].ask);
              const exchangeRateFormated = (Math
                .round(exchangeRate * 100) / 100).toFixed(2);
              const cost = Number(expense.value);
              const convertedValue = (Math
                .round((cost * exchangeRate) * 100) / 100).toFixed(2);
              const currencyConversion = 'Real';

              return (
                <tr key={ index }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{valueFormated}</td>
                  <td>{currencyName}</td>
                  <td>{exchangeRateFormated}</td>
                  <td>{convertedValue}</td>
                  <td>{currencyConversion}</td>
                  <td>
                    <button type="button">Editar</button>
                    <button type="button">Excluir</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          {/* <tr>
            <td>teste1</td>
            <td>teste2</td>
            <td>teste3</td>
            <td>teste4</td>
            <td>teste5</td>
            <td>teste6</td>
            <td>teste7</td>
            <td>teste8</td>
            <td>teste9</td>
          </tr> */}
        </table>

      </div>
    );
  }
}

Table.propTypes = {
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

export default connect(mapStateToProps)(Table);
