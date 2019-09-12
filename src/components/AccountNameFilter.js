import React, {Component} from 'react';
import {connect} from 'react-redux';

class AccountNameFilter extends Component {

    render() {

        const {accountNames} = this.props;
        return (
            <form>
                <legend> Account Name Filters</legend>
                <fieldset>
                    <ul>
                    {accountNames.map((item, index) => {
                        return  <li key={index}>
                            <label htmlFor="">
                                <input
                                    id="accountName"
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
)(AccountNameFilter);
