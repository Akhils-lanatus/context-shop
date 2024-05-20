import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useGlobalCartContext } from "./Context/Context";
import Header from "./Components/Header";
import { Box } from "@mui/material";
import HomePage from "./Components/HomePage";

const App = () => {
  const { darkMode } = useGlobalCartContext();

  return (
    <Box
      sx={{
        bgcolor: darkMode ? "#212121" : "#fff",
        color: !darkMode ? "#212121" : "#fff",
        height: "100% ",
      }}
    >
      <Header />
      <HomePage />
    </Box>
  );
};

export default App;
