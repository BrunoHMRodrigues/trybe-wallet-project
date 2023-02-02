import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { loginSave } from '../redux/actions/index';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      buttonDisabled: true,
    };

    this.emailValidation = this.emailValidation.bind(this);
    this.passwordValidation = this.passwordValidation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { email, password } = this.state;
      const emailValidate = this.emailValidation(email);
      const passwordValidate = this.passwordValidation(password);
      this.setState({
        buttonDisabled: !((emailValidate && passwordValidate)),
      });
    });
  };

  emailValidation = (email) => {
    const validRegex = /^.*@.*\.com.*$/i;
    return !!(email.match(validRegex));
  };

  passwordValidation = (password) => {
    const minLength = 6;

    return (password.length >= minLength);
  };

  handleClick = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(loginSave(email));
    history.push('/carteira');
  };

  render() {
    const { buttonDisabled } = this.state;
    return (
      <>
        <div>Login</div>
        <label htmlFor="email">
          <input
            data-testid="email-input"
            placeholder="Digite o e-mail"
            name="email"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="password">
          <input
            data-testid="password-input"
            placeholder="Digite a senha"
            name="password"
            onChange={ this.handleChange }
          />
        </label>

        <button
          type="button"
          disabled={ buttonDisabled }
          onClick={ this.handleClick }
        >
          Entrar

        </button>
      </>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
