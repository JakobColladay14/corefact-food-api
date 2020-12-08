// Reasoning behind placing Query in a seperate context was to create a more complex filter 
// and to seperate the logic between the url query building and the recipe data

import React, { useContext, useState } from 'react'

let defaultQuery = {
    query: '',
    url: '',
    ingredients: 0, // Max Number of ingredients
    diet: 'all', // Diet Labels,
    cuisine: 'all', // Cuisine
    meal: 'all',
    minCalories: 0,
    maxColories: 0,
    dishType: 'all'
}

const QueryContext = React.createContext()

export function QueryProvider( {children} ) {
    const [queryState, setQueryState] = useState(defaultQuery)


    const handleSearch = (e) => {
        e.preventDefault()
        setQueryState({...queryState, query: e.target[0].value})
    }

    return (
        <QueryContext.Provider value={{queryState, handleSearch}}>
            {children}
        </QueryContext.Provider>
    )
}

export function UseQueryContext() {
    return useContext(QueryContext)
}