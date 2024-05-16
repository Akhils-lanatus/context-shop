import * as React from "react";
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
//search
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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Header() {
  const { toggleTheme, darkMode } = useGlobalCartContext();
  const [open, setOpen] = React.useState(false);
  return (
    <Box>
      {open && <FilterDrawer open={open} setOpen={setOpen} />}
      <AppBar position="static" sx={{ bgcolor: "#254061" }}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: {
              lg: "space-between",
              md: "space-between",
              sm: "space-between",
              xs: "start",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>
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
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
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
              sx={{ mt: 1, mr: 1 }}
              badgeContent={0}
              size="sm"
              showZero={false}
            >
              <Typography fontSize="25px">🛒</Typography>
            </Badge>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
