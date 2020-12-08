import React from 'react'
import Recipe from '../../components/recipes/Recipe'
import { UseFoodContext } from '../../context/Context'
import './RecipeList.sass'

export default function RecipeList() {
    const { recipeState } = UseFoodContext()
    

    if(recipeState.recipes.length === 0) {
        return (
            <div className="no-recipes">
                <h1>Search for Recipes Above</h1>
            </div>
        )
    } else {
        return (
            <div>
                <div className="recipes">
                    {recipeState.sortedRecipes.map(recipe => (
                        <Recipe
                            key={Math.random(Date.now())}
                            label={recipe.recipe.label}
                            calories={recipe.recipe.calories}
                            image={recipe.recipe.image}
                            ingredients={recipe.recipe.ingredients}
                        />
                    ))}
                </div>
            </div>
        )
    }
}
