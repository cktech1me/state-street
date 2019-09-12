import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import MainNavigation from '../components/MainNavigation';
import "./TransactionPage.css";
import {fetchTransactions} from "../store/actions";
import TransactionTypeFilter from "../components/TransactionTypeFilter";
import AccountNameFilter from "../components/AccountNameFilter";
import ReactTable from "react-table";
import "react-table/react-table.css";
import {Link} from "react-router-dom";

class TransactionPage extends Component {

    constructor() {
        super();
        this.state = {
            filtered: []
        };
    }

    componentDidMount() {
        this.props.dispatch(fetchTransactions());
    }

    onFilteredCheckChangeCustom = (e) => {

        let filtered = this.state.filtered;

        if (e.currentTarget.checked) {
            this.onFilteredChangeCustom(e.currentTarget.name, e.currentTarget.id);
        } else {
            if (filtered.length) {
                filtered = filtered.filter(a => a.value !== e.currentTarget.name);
                this.setState({filtered: filtered});
            }
        }
    };


    onFilteredChangeCustom = (value, accessor) => {
        let filtered = this.state.filtered;
        let insertNewFilter = 1;

        if (insertNewFilter) {
            filtered.push({id: accessor, value: value});
        }

        this.setState({filtered: filtered});
    };

    getFilterBoxes = () => {
        return (
            <div>
                <TransactionTypeFilter
                    updateFilters={this.onFilteredCheckChangeCustom}
                />
                <AccountNameFilter
                    updateFilters={this.onFilteredCheckChangeCustom}
                />
            </div>);
    };

    render() { // Testing with react-table, why reinvent the wheel?
        const {error, loading, transactions} = this.props;

        if (error) {
            return <div>Error! {error.message}</div>;
        }

        if (loading) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <MainNavigation/>
                {this.getFilterBoxes()}
                <ReactTable
                    data={transactions}
                    filterable
                    filtered={this.state.filtered}
                    onFilteredChange={(filtered, column, value) => {
                        this.onFilteredChangeCustom(value, column.id || column.accessor);
                    }}
                    defaultFilterMethod={(filter, row, column) => {
                        const id = filter.pivotId || filter.id;
                        if (typeof filter.value === "object") {
                            return row[id] !== undefined
                                ? filter.value.indexOf(row[id]) > -1
                                : true;
                        } else {
                            return row[id] !== undefined
                                ? String(row[id]).indexOf(filter.value) > -1
                                : true;
                        }
                    }}
                    columns={[
                        {
                            columns: [
                                {
                                    Header: "ACCOUNT NO.",
                                    accessor: "account",
                                    Cell: ({row}) => {
                                        return (<Link
                                            to={{pathname: `/accountDetails/${row.account}`}}>{row.account}</Link>)
                                    }
                                },
                                {
                                    Header: "ACCOUNT NAME",
                                    accessor: "accountName"

                                },
                                {
                                    Header: "AMOUNT",
                                    accessor: "amount"

                                },
                                {
                                    Header: "CURRENCY",
                                    accessor: "currencyCode"

                                },
                                {
                                    Header: "TRANSACTION TYPE",
                                    accessor: "transactionType"

                                }
                            ]
                        }
                    ]}
                    defaultPageSize={15}
                    className="-striped -highlight"
                />
                <br/>
            </div>
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

export default connect(mapStateToProps
)(TransactionPage);

