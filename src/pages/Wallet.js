import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
    };
  }

  componentDidMount() {
    console.log(this.props);
    const { user } = this.props;
    this.setState({
      email: user.email,
    });
  }

  render() {
    const { email } = this.state;

    return (
      <>
        <div>TrybeWallet</div>
        <p>{email}</p>
      </>
    );
  }
}

Wallet.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});

export default connect(mapStateToProps)(Wallet);
