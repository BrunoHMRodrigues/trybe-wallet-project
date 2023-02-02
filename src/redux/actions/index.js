import { LOGIN, CURRENCIES } from './typeActions';

const loginSave = (email) => ({
  type: LOGIN,
  payload: email,
});

const currenciesSave = (currencies) => ({
  type: CURRENCIES,
  payload: currencies,
});

export { loginSave, currenciesSave };
