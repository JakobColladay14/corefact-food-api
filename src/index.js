import React from "react";
import ReactDOM from "react-dom";
import "./styles.sass";
import Search from './components/search/Search'
import RecipeList from "./pages/recipeList/RecipeList";
import { FoodProvider } from './context/Context'
import Pagination from "./components/pagination/Pagination";

const App = () => {
  return (
    <FoodProvider>
      <div className="App">
        <Search />
        <Pagination />
        <hr />
        <RecipeList />
      </div>
    </FoodProvider>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
