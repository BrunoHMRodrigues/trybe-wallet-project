import { LOGIN, CURRENCIES, EXPENSES } from './typeActions';

const loginSave = (email) => ({
  type: LOGIN,
  payload: email,
});

const currenciesSave = (currencies) => ({
  type: CURRENCIES,
  payload: currencies,
});

const expendureSave = (expenses) => ({
  type: EXPENSES,
  payload: expenses,
});

export function fetchCurrencies() {
  return (dispatch) => {
    dispatch(expendureSave()); // dispatch da action 'REQUEST_MOVIES_STARTED'
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((result) => {
        const currenciesKeys = Object.keys(result);
        const currencies = [];
        for (let index = 0; index < currenciesKeys.length; index += 1) {
          const USDT = 'USDT';
          if (currenciesKeys[index] !== USDT) {
            currencies.push(currenciesKeys[index]);
          }
        }
        return dispatch(currenciesSave(currencies));
      });
  };
}

export { loginSave, currenciesSave, expendureSave };
