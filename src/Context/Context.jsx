/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import cartReducer from "./Reducer";

//cart-context
const CartContext = createContext();

//initial-State
const initialState = {
  products: [],
  darkMode: false,
  searchQuery: "",
  allCategories: [],
  selectedFilters: {
    deliveryDays: new Set(),
    selectedBrand: new Set(),
    selectedRatings: new Set(),
    selectedPriceRange: { min: 0, max: 0 },
    showOutOfStock: false,
  },
};

//provider
// eslint-disable-next-line react/prop-types
const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [searchedData, setSearchedData] = useState([]);

  //fetchApiData
  const fetchApiData = async () => {
    try {
      await fetch("https://akhil1911.github.io/api/products.json")
        .then((response) => response.json())
        .then((response) =>
          dispatch({ type: "GET_ALL_PRODUCTS", payload: response })
        );
    } catch (error) {
      console.log(error);
    }
  };

  //toggle theme
  const toggleTheme = () => {
    dispatch({ type: "TOGGLE_THEME" });
  };

  //set-selected-filters
  const setSelectedFilters = (filterOn, item, bool) => {
    dispatch({ type: "SET_FILTER", payload: { filterOn, item, bool } });
  };

  //set-price-range-filter
  const setSelectedPriceRange = ({ min, max }) => {
    dispatch({ type: "SET_PRICE_FILTER", payload: { min, max } });
  };

  //include-out-of-stock
  const setIncludeOutOfStock = (bool) => {
    dispatch({ type: "SET_INCLUDE_OUT_OF_STOCK", payload: bool });
  };

  //search-data
  const setSearchQuery = (searchStr) => {
    dispatch({ type: "SEARCH_PRODUCTS", payload: searchStr });
  };

  //clear-all-filters
  const clearAllFilters = () => {
    dispatch({ type: "CLEAR_ALL_FILTERS" });
  };

  //fetching-data-from-api-function-call
  useEffect(() => {
    fetchApiData();
  }, []);
  return (
    <CartContext.Provider
      value={{
        ...state,
        toggleTheme,
        setSelectedFilters,
        clearAllFilters,
        setSelectedPriceRange,
        setIncludeOutOfStock,
        setSearchQuery,
        searchedData,
        setSearchedData,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

//custom useContext
const useGlobalCartContext = () => {
  return useContext(CartContext);
};

export { CartContextProvider, useGlobalCartContext };
