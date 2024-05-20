import React, { useEffect, useMemo, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/joy/IconButton";
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
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Sheet from "@mui/joy/Sheet";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: 10,
  width: "42%",
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

  const handleClick = () => {
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
    allCategories,
  } = useGlobalCartContext();
  const [open, setOpen] = useState(false);
  const [searchStr, setSearchStr] = useState("");

  return (
    <Box>
      {open && <FilterDrawer open={open} setOpen={setOpen} />}
      <AppBar position="fixed" sx={{ bgcolor: "#254061" }}>
        <Toolbar
          sx={{
            padding: 0,
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
              onChange={(e) => setSearchStr(e.target.value)}
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
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "#353535",
          mt: { lg: 8, md: 8, sm: 8, xs: 7 },
        }}
      >
        <Toolbar sx={{ minHeight: "fit-content !important", padding: 0 }}>
          <>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {searchedData?.length > 0 && searchQuery?.trim() !== "" && (
                <IconButton
                  size="large"
                  edge="start"
                  aria-label="menu"
                  onClick={() => setOpen(true)}
                  sx={{
                    position: {
                      sm: "absolute",
                      lg: "unset",
                      md: "unset",
                      xs: "unset",
                    },
                    color: "white",
                    left: { sm: 0 },
                    ml: 1,
                  }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                overflowX: {
                  lg: "hidden",
                  md: "hidden",
                  sm: "scroll",
                  xs: "scroll",
                },
                overflowYL: "hidden",
                width: "100%",
              }}
            >
              <RadioGroup
                orientation="horizontal"
                size="md"
                sx={{
                  gap: {
                    lg: 3,
                    md: 3,
                    sm: 3,
                    xs: 0,
                  },

                  lineHeight: 1,

                  padding: 1,
                }}
              >
                {allCategories?.map((value, i) => (
                  <Sheet
                    key={i}
                    sx={{
                      textAlign: "center",
                      width: "100%",
                      bgcolor: "#353535",
                    }}
                  >
                    <Radio
                      label={`${value}`}
                      overlay
                      disableIcon
                      value={value}
                      slotProps={{
                        label: () => ({
                          sx: {
                            fontWeight: "md",
                            fontSize: "md",
                            color: "#fff",
                            textTransform: "capitalize",
                            padding: 1,
                          },
                        }),
                        action: ({ checked }) => ({
                          sx: () => ({
                            ":hover": {
                              bgcolor: "transparent",
                            },
                            borderColor: "transparent",
                            ...(checked && {
                              "--variant-borderWidth": "2px",
                              "&&": {
                                borderBottom: "2px solid white",
                                borderRadius: 0,
                              },
                            }),
                          }),
                        }),
                      }}
                    />
                  </Sheet>
                ))}
              </RadioGroup>
            </Box>
          </>
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
