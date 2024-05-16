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
  cart: [],
  singleProd: [],
};

//provider
// eslint-disable-next-line react/prop-types
const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const fetchApiData = async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      dispatch({ type: "GET_ALL_PRODUCTS", payload: ProductsData });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchApiData();
  }, []);
  console.log(state);
  return (
    <CartContext.Provider value={{ ...state }}>{children}</CartContext.Provider>
  );
};

//custom useContext
const useGlobalCartContext = () => {
  return useContext(CartContext);
};

export { CartContextProvider, useGlobalCartContext };
