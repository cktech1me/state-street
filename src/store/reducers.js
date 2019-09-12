import {
    FETCH_TRANSACTIONS_BEGIN,
    FETCH_TRANSACTIONS_SUCCESS,
    FETCH_TRANSACTIONS_FAILURE,
    UPDATE_TRANSACTION_NAME_LIST,
    UPDATE_ACCOUNT_NAME_LIST
} from './actions';

const initialState = {
    transactions: [],
    loading: false,
    error: null,
    transactionTypes: [],
    accountNames: []

};

export default function transactionReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_TRANSACTIONS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                transactions: action.payload.transactions
            };

        case FETCH_TRANSACTIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                transactions: []
            };

        case UPDATE_TRANSACTION_NAME_LIST:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                transactionTypes: action.payload.transactionTypes
            };

        case UPDATE_ACCOUNT_NAME_LIST:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                accountNames: action.payload.accountNames
            };

        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
}
