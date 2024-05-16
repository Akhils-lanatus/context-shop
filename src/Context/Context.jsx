/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useReducer } from "react";
import cartReducer from "./Reducer";
import { ProductsData } from "../FakeData/ProductsData";

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
    availableInStock: false,
  },
};

//provider
// eslint-disable-next-line react/prop-types
const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  //fetchApiData
  const fetchApiData = () => {
    dispatch({ type: "SET_LOADING" });
    try {
      dispatch({ type: "GET_ALL_PRODUCTS", payload: ProductsData });
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
      value={{ ...state, toggleTheme, setSelectedFilters, clearAllFilters }}
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
