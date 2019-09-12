export const UPDATE_TRANSACTION_NAME_LIST = 'UPDATE_TRANSACTION_NAME_LIST';
export const UPDATE_ACCOUNT_NAME_LIST = 'UPDATE_ACCOUNT_NAME_LIST';
export const FETCH_TRANSACTIONS_BEGIN   = 'FETCH_TRANSACTIONS_BEGIN';
export const FETCH_TRANSACTIONS_SUCCESS = 'FETCH_TRANSACTIONS_SUCCESS';
export const FETCH_TRANSACTIONS_FAILURE = 'FETCH_TRANSACTIONS_FAILURE';
export const fetchTransactionsBegin = () => ({
  type: FETCH_TRANSACTIONS_BEGIN
});

export const updateTransactionTypes = transactionTypes => ({
  type: UPDATE_TRANSACTION_NAME_LIST,
  payload: { transactionTypes }
});
export const updateAccountNames = accountNames => ({
  type: UPDATE_ACCOUNT_NAME_LIST,
  payload: { accountNames }
});

export const fetchTransactionsSuccess = transactions => ({
  type: FETCH_TRANSACTIONS_SUCCESS,
  payload: { transactions }
});

export const fetchTransactionsFailure = error => ({
  type: FETCH_TRANSACTIONS_FAILURE,
  payload: { error }
});

export function fetchTransactions() {
  return dispatch => {
    dispatch(fetchTransactionsBegin());
    return fetch("/data.json")
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
          dispatch(fetchTransactionsSuccess(json.transactions));
          return json.transactions;
        })
        .then(transactions => { // Some ES6
          const uniqueTransactionsTypes = [...new Set(transactions.map(transaction => transaction.transactionType))];
          const uniqueAccountNames = [...new Set(transactions.map(transaction => transaction.accountName))];
          dispatch(updateTransactionTypes(uniqueTransactionsTypes));
          dispatch(updateAccountNames(uniqueAccountNames));
          return uniqueTransactionsTypes;
        })
        .catch(error => dispatch(fetchTransactionsFailure(error)));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

