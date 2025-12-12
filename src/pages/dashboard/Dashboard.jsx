import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import FilterBar from "../../components/FilterBar/FilterBar";
import LoanTable from "../../components/LoanTable/LoanTable";

import { getLoans } from "../../utils/storage";
import "./Dashboard.css";

export default function Dashboard() {
    const [loans, setLoans] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [sortDir, setSortDir] = useState(null);

    useEffect(() => {
        const data = getLoans();
        setLoans(data);
        setFiltered(data);
    }, []);

    const handleFilter = ({ q, loanType, status, city, from, to }) => {
        let out = [...loans];

        if (q) out = out.filter((x) => x.customerName.toLowerCase().includes(q.toLowerCase()));
        if (loanType) out = out.filter((x) => x.loanType === loanType);
        if (status) out = out.filter((x) => x.status === status);
        if (city) out = out.filter((x) => x.city === city);
        if (from) out = out.filter((x) => x.applicationDate >= from);
        if (to) out = out.filter((x) => x.applicationDate <= to);

        setFiltered(out);
    };

    const handleSort = (field) => {
        const next = sortDir === "asc" ? "desc" : "asc";
        setSortDir(next);

        setFiltered((prev) =>
            [...prev].sort((a, b) =>
                next === "asc"
                    ? a[field] > b[field] ? 1 : -1
                    : a[field] < b[field] ? 1 : -1
            )
        );
    };

    return (
        <>           
            <div className=" container">               

                <div className="container">
                     <Header />
                    <div className="dashboard-card">
                        <h2 className="dashboard-title">Loan Dashboard</h2>

                        <div className="dashboard-filter-box">

                            <FilterBar loans={loans} onFilter={handleFilter} />
                        </div>

                        <div className="dashboard-table-box">
                            <LoanTable loans={filtered} onSort={handleSort} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
