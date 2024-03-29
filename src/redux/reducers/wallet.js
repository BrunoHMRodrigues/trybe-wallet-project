// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

// import {  } from '../actions';
import { CURRENCIES, EXPENSES, EDIT } from '../actions/typeActions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES:
    return { ...state, currencies: action.payload };
  case EXPENSES:
    return { ...state, expenses: [...action.payload] };
  case EDIT:
    return { ...state,
      editor:
      action.payload.shouldEdit,
      idToEdit: Number(action.payload.id) };
  default:
    return state;
  }
};

export default wallet;
