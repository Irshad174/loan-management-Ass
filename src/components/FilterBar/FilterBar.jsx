import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./FilterBar.css";
import { debounce } from "../../utils/debounce";

export default function FilterBar({ loans, onFilter }) {
    const [qInput, setQInput] = useState("");

    const [filters, setFilters] = useState({
        q: "",
        loanType: "",
        status: "",
        city: "",
        from: "",
        to: "",
    });

    const unique = useCallback(
        (key) => [...new Set(loans.map((loan) => loan[key]).filter(Boolean))],
        [loans]
    );

    const applyDebounce = useMemo(
        () =>
            debounce((value) => {
                setFilters((prev) => ({ ...prev, q: value }));
            }, 400),
        []
    );

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setQInput(value);
        applyDebounce(value);
    };

    const updateFilter = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    // ⭐ CLEAR ALL FILTERS
    const clearAllFilters = () => {
        setFilters({
            q: "",
            loanType: "",
            status: "",
            city: "",
            from: "",
            to: "",
        });

        setQInput(""); // search input UI reset
    };
 const isFilterApplied = () => {
        return (
            filters.q ||
            filters.loanType ||
            filters.status ||
            filters.city ||
            filters.from ||
            filters.to
        );
    };
    useEffect(() => {
        onFilter(filters);
    }, [filters, onFilter]);

    return (
        <div className="filter-bar">
            <input
                className="input-field search-input"
                placeholder="Search name..."
                value={qInput}
                onChange={handleSearchChange}
            />

            <select
                className="input-field"
                value={filters.loanType}
                onChange={(e) => updateFilter("loanType", e.target.value)}
            >
                <option value="">All Types</option>
                {unique("loanType").map((t) => (
                    <option key={t} value={t}>{t}</option>
                ))}
            </select>

            <select
                className="input-field"
                value={filters.status}
                onChange={(e) => updateFilter("status", e.target.value)}
            >
                <option value="">All Status</option>
                {unique("status").map((s) => (
                    <option key={s} value={s}>{s}</option>
                ))}
            </select>

            <select
                className="input-field"
                value={filters.city}
                onChange={(e) => updateFilter("city", e.target.value)}
            >
                <option value="">All Cities</option>
                {unique("city").map((c) => (
                    <option key={c} value={c}>{c}</option>
                ))}
            </select>

            <input
                className="input-field"
                type="date"
                value={filters.from}
                onChange={(e) => updateFilter("from", e.target.value)}
            />

            <input
                className="input-field"
                type="date"
                value={filters.to}
                onChange={(e) => updateFilter("to", e.target.value)}
            />
{isFilterApplied() && (
                <button
                    className="clear-btn"
                    type="button"
                    onClick={clearAllFilters}
                >
                    Clear
                </button>
            )}
        </div>
    );
}
