import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AccountDetailsPage from './pages/TransactionDetailsPage';
import TransactionPage from "./pages/TransactionPage";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={TransactionPage} exact />
          <Route path="/accountDetails/:account" component={AccountDetailsPage} exact />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
