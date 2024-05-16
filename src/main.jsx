import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CartContextProvider } from "./Context/Context.jsx";
import "./Styles/Style.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CartContextProvider>
    <App />
  </CartContextProvider>
);
