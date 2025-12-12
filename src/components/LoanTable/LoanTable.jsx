import React from "react";
import "./LoanTable.css";

export default function LoanTable({ loans, onSort }) {
    return (
        <table className="loan-table">
            <thead>
                <tr>
                    <th>Customer</th>
                    <th>Loan ID</th>
                    <th>Type</th>
                    <th onClick={() => onSort("amount")}>Amount ⤵</th>
                    <th>Status</th>
                    <th>City</th>
                    <th>Application Date</th>
                </tr>
            </thead>

            <tbody>
                {loans.length === 0 ? (
                    <tr>
                        <td colSpan="7" className="no-data">No records found</td>
                    </tr>
                ) : (
                    loans.map((loan, i) => (
                        <tr key={i}>
                            <td>{loan.customerName}</td>
                            <td>{loan.loanId}</td>
                            <td>{loan.loanType}</td>
                            <td>{loan.amount.toLocaleString()}</td>
                            <td><span className={`status-badge ${loan.status.toLowerCase()}`}>{loan.status}</span></td>
                            <td>{loan.city}</td>
                            <td>{loan.applicationDate}</td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
}
