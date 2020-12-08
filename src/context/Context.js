import React, { useContext, useEffect, useState } from 'react'
import { ApiKeys } from '../ApiConfig'
import axios from "axios";
import { UseQueryContext } from './QueryContext'


let config = {
    'Access-Control-Allow-Origin': true
}

let defaultRecipe = {
    recipes: [],
    sortedRecipes: [],
    totalRecipes: 0,
    pageShown: 1,
    offset: 0,
    perPage: 10,
    maxPages: 0
}

const FoodContext = React.createContext()

export function FoodProvider( {children} ) {
    const [search, setSearch] = useState('')
    const [recipeState, setRecipes] = useState(defaultRecipe)
    const { queryState } = UseQueryContext()
    
    useEffect(() => {
        const url = `https://api.edamam.com/search?q=${queryState.query}&app_id=${ApiKeys.APP_ID}&app_key=${ApiKeys.API_KEY}&from=0&to=100`
        const getRecipes = async () => {
            const response = await axios.get(
                url, 
                config
            );
            let data = response.data.hits
            setRecipe(data)
        }
        getRecipes()
    }, [queryState])

    const setRecipe = (data) => {
        if(data) {
            let sortedRecipes = data.slice(recipeState.offset, recipeState.offset + recipeState.perPage)
            setRecipes({...recipeState, recipes: data, sortedRecipes: sortedRecipes, maxPages: data.length / 10})
        }
    }

    const handlePaginationData = (page) => {
        const selectedPage = page
        const offset = page === 1 ? 0 : (selectedPage * recipeState.perPage) - 10

        let sortedData = recipeState.recipes.slice(offset, offset + recipeState.perPage)
        setRecipes({...recipeState, sortedRecipes: sortedData, pageShown: selectedPage, offset})

    }

    return (
        <FoodContext.Provider value={{recipeState, setRecipes, search, setSearch, handlePaginationData}}>
            {children}
        </FoodContext.Provider>
    )
}

export function UseFoodContext() {
    return useContext(FoodContext)
}