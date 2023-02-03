import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { fetchExchangeRates, editExpense } from '../redux/actions/index';

class Table extends Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleDelete({ target }) {
    const { dispatch, wallet: { expenses } } = this.props;
    const { id } = target;
    let newExpenses = [];
    if (expenses.length > 1) {
      let count = 0;
      for (let index = 0; index < expenses.length; index += 1) {
        if (expenses[index] !== expenses[id]) {
          expenses[index].id = count;
          newExpenses.push(expenses[index]);
          count += 1;
        }
      }
    } else {
      newExpenses = null;
    }
    dispatch(fetchExchangeRates(newExpenses));
  }

  handleEdit({ target }) {
    // const { dispatch, wallet: { expenses } } = this.props;
    const { dispatch } = this.props;
    const { id } = target;
    // const { value, description, currency, method, tag, exchangeRates } = expenses[id];
    dispatch(editExpense(true, id));
  }

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
                    <button
                      type="button"
                      data-testid="edit-btn"
                      id={ index }
                      onClick={ this.handleEdit }
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      data-testid="delete-btn"
                      id={ index }
                      onClick={ this.handleDelete }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

      </div>
    );
  }
}

Table.propTypes = {
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

export default connect(mapStateToProps)(Table);
