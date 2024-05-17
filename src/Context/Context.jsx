/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useReducer } from "react";
import cartReducer from "./Reducer";

//cart-context
const CartContext = createContext();

//initial-State
const initialState = {
  isLoading: true,
  products: [],
  darkMode: false,
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

  //fetchApiData
  const fetchApiData = async () => {
    dispatch({ type: "SET_LOADING" });
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
  const setIncludeOutOfStock = (isIOOSchecked) => {
    dispatch({ type: "SET_INCLUDEOUTOFSTOCK", payload: isIOOSchecked });
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
