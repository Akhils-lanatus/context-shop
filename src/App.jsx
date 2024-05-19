import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useGlobalCartContext } from "./Context/Context";
import Header from "./Components/Header";
import { Box } from "@mui/material";
import HomePage from "./Components/HomePage";

const App = () => {
  const { isLoading, darkMode } = useGlobalCartContext();
  if (isLoading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
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
