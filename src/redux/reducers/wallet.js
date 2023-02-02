// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

// import {  } from '../actions';
import { CURRENCIES } from '../actions/typeActions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  const currencies = action.payload;
  switch (action.type) {
  case CURRENCIES:
    return { ...state, currencies };
  default:
    return state;
  }
};

export default wallet;
