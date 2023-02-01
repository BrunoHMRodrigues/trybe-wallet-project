import { LOGIN } from './typeActions';

const loginSave = (email) => ({
  type: LOGIN,
  payload: email,
});

export { loginSave };
