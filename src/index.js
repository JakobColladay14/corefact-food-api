import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./styles.scss";

import Recipes from "./components/Recipes";
import axios from "axios";

const App = () => {
  const APP_ID = "11ea17a1";
  const API_KEY = "e695d33aa0c9a58c08789d5261b94837";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    console.log("initiail");
    const getRecipes = async () => {
      const response = await axios.get(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${API_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`
      );
      setRecipes(response.data.hits);
    };
    getRecipes();
  }, [query]);

  const handleSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      <form onSubmit={handleSearch}>
        <h2>Search Item by Name like 'Chicken', 'Peanuts', 'Banana'!</h2>
        <div className="search-item">
          <input
            type="text"
            value={search}
            onChange={e => {
              setSearch(e.target.value);
            }}
          />
          <button tpye="submit">Search</button>
        </div>
      </form>
      <hr />
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipes
            key={Math.random(Date.now())}
            label={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
          />
        ))}
      </div>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
