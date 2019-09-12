import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainNavigation from '../components/MainNavigation';
import './TransactionDetailsPage.css';

class TransactionDetailsPage extends Component {

  renderDetails(accountNumber) {
    const { transactions } = this.props;
    return (transactions.map((item, index) => {
      const {account, accountName, amount, transactionType, currencyCode} = item;
      //destructuring
      if (account === accountNumber) {
        return (
            <React.Fragment>
              <h1> Transaction {account} </h1>
              <hr/>
              <p>Account No. {account}</p>
              <p>Account Name: {accountName}</p>
              <p>Currency Code: {currencyCode}</p>
              <p>Amount: {amount}</p>
              <p>Transaction Type: {transactionType}</p>
            </React.Fragment>
        )
      }
    }))
  }

  render() {
    const { account } = this.props.match.params
    return (
      <React.Fragment>
          {account === 0 && <p>No Account Selected!</p>}
        <MainNavigation selectedAccountNumber={account}/>
        <main className="accountDetails">
          {this.renderDetails(account)}
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  transactions: state.transactions.transactions
});

export default connect(
    mapStateToProps
)(TransactionDetailsPage);
