// Esse reducer será responsável por tratar as informações da pessoa usuária

// import {  } from '../actions';
import { LOGIN } from '../actions/typeActions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  const email = action.payload;
  switch (action.type) {
  case LOGIN:
    return { ...state, email };
  default:
    return state;
  }
};

export default user;
