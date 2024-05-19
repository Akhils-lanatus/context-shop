import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import { Badge, Switch } from "@mui/joy";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useGlobalCartContext } from "../Context/Context";
import FilterDrawer from "./FilterDrawer";
import { InputAdornment } from "@mui/material";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fade from "@mui/material/Fade";
import PropTypes from "prop-types";
import useScrollTrigger from "@mui/material/useScrollTrigger";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 10,
  marginRight: 10,
  width: "40%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "40%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = document.querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 50, right: 16, zIndex: 100 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function Header(props) {
  const {
    toggleTheme,
    darkMode,
    setSearchedProducts,
    searchQuery,
    searchedData,
  } = useGlobalCartContext();
  const [open, setOpen] = useState(false);
  const [searchStr, setsearchStr] = useState("");
  return (
    <Box>
      {open && <FilterDrawer open={open} setOpen={setOpen} />}
      <AppBar position="fixed" sx={{ bgcolor: "#254061" }}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: {
              lg: "space-between",
              md: "space-evenly",
              sm: "center",
              xs: "start",
            },
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {searchQuery?.trim() !== "" && searchedData?.length > 0 && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setOpen(true)}
                sx={{
                  position: {
                    sm: "absolute",
                    lg: "unset",
                    md: "unset",
                    xs: "unset",
                  },
                  left: { sm: 0 },
                  ml: { sm: 2 },
                  mr: { sm: 2 },
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant="h6"
              component="div"
              mr={1}
              sx={{
                display: { xs: "none", md: "flex" },
              }}
            >
              ShopDB
            </Typography>
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ ml: -1 }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchStr}
              onChange={(e) => setsearchStr(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    size="small"
                    sx={{
                      position: "absolute",
                      right: "6px",
                      color: "white",
                      bgcolor: "gray",
                      borderRadius: "4px !important",
                      padding: 0.5,
                      ":hover": {
                        bgcolor: "gray",
                      },
                    }}
                    onClick={() => {
                      setSearchedProducts(searchStr);
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </Search>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-around"}
            width={"15%"}
          >
            <Switch
              color={darkMode ? "primary" : "neutral"}
              slotProps={{ input: { "aria-label": "dark mode" } }}
              startDecorator={<LightModeIcon />}
              endDecorator={<DarkModeIcon />}
              checked={darkMode}
              onChange={toggleTheme}
              sx={{ mr: 2 }}
            />
            <Badge
              sx={{ mt: 1, mr: 1, cursor: "pointer" }}
              badgeContent={0}
              size="sm"
              showZero={false}
            >
              <Typography fontSize="25px">🛒</Typography>
            </Badge>
          </Box>
        </Toolbar>
      </AppBar>
      <span id="back-to-top-anchor" />
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Box>
  );
}
