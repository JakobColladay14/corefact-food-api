import React from 'react'
import { UseFoodContext } from '../../context/Context'
import { UseQueryContext } from '../../context/QueryContext'
import './Search.sass'

export default function Search() {
    const { setSearch, search } = UseFoodContext()
    const { handleSearch } = UseQueryContext()

    return (
        <form onSubmit={handleSearch} className="search-ctr">
            <h2>Search Item by Name like 'Chicken', 'Peanuts', 'Banana'!</h2>
            <div className="search-item">
                <input
                    type="text"
                    value={search}
                    onChange={e => {
                        setSearch(e.target.value);
                    }}
                />
                <button type="submit">Search</button>
            </div>
        </form>
    )
}
