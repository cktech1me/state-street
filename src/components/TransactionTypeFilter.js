import React, {Component} from 'react';
import {connect} from 'react-redux';

class TransactionTypeFilter extends Component {

    render() {

        const {transactionTypes} = this.props;
        return (
            <form>
                <legend> Transaction Type Filters</legend>
                <fieldset>
                    <ul>
                    {transactionTypes.map((item, index) => {
                        return  <li key={index}>
                            <label htmlFor="">
                                <input
                                    id="transactionType"
                                    type="checkbox"
                                    name={item}
                                    onChange={this.props.updateFilters}
                                />
                                { item }
                            </label>
                        </li>
                    })}
                    </ul>
                </fieldset>
            </form>
        );
    }
}


const mapStateToProps = state => ({
    transactions: state.transactions.transactions,
    loading: state.transactions.loading,
    error: state.transactions.error,
    transactionTypes: state.transactions.transactionTypes,
    accountNames: state.transactions.accountNames
});

export default connect(
    mapStateToProps
)(TransactionTypeFilter);
