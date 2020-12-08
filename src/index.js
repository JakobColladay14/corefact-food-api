import React from "react";
import ReactDOM from "react-dom";
import "./styles.sass";
import Search from './components/search/Search'
import RecipeList from "./pages/recipeList/RecipeList";
import { FoodProvider } from './context/Context'
import Pagination from "./components/pagination/Pagination";
import { QueryProvider } from "./context/QueryContext";

const App = () => {
  return (
    <QueryProvider>
      <FoodProvider>
          <Search />
          <Pagination />
          <hr />
          <RecipeList />
      </FoodProvider>
    </QueryProvider>
    );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
