import { useState, useContext } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Menu,
  MenuItem,
  Badge,
  Drawer,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import Logo from "../assets/Logo.png";
import { FaTimes, FaBars } from "react-icons/fa";
import { RiUserHeartLine } from "react-icons/ri";
import { TbShoppingCartHeart } from "react-icons/tb";
import { GiShoppingBag } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ProductsContext } from "../context/ProductContext";
import { getAuth, signOut } from "firebase/auth";
import Carrito from "../pages/Carrito";

export const NavBar = () => {
  const { user } = useContext(AuthContext);
  const { cart } = useContext(ProductsContext);
  const [menuElement, setMenuElement] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [hamburgerMenuElement, setHamburgerMenuElement] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setMenuElement(event.currentTarget);
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleHamburgerMenuOpen = (event) => {
    setHamburgerMenuElement(event.currentTarget);
  };

  const handleHamburgerMenuClose = () => {
    setHamburgerMenuElement(null);
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setIsMenuOpen(false);
      })
      .catch((error) => {
        console.error("Error al cerrar sesión: ", error);
      });
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleCheckout = () => {
    if (!user) {
      setOpenSnackbar(true);
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "#EEF0F2" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center" gap="10px">
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton onClick={handleHamburgerMenuOpen}>
                <FaBars size={24} color="#566663" />
              </IconButton>
              <Menu
                anchorEl={hamburgerMenuElement}
                open={Boolean(hamburgerMenuElement)}
                onClose={handleHamburgerMenuClose}
              >
                <MenuItem
                  component={Link}
                  to="/"
                  onClick={handleHamburgerMenuClose}
                >
                  Inicio
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/productos"
                  onClick={handleHamburgerMenuClose}
                >
                  Productos
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/agradecimiento"
                  onClick={handleHamburgerMenuClose}
                >
                  Agradecimiento
                </MenuItem>
              </Menu>
            </Box>

            <IconButton component={Link} to="/">
              <img src={Logo} alt="Logo" style={{ height: "60px" }} />
            </IconButton>
          </Box>

          <Box
            display={{ xs: "none", md: "flex" }}
            gap="20px"
            sx={{ flexGrow: 1, justifyContent: "center" }}
          >
            <Button component={Link} to="/" sx={{ color: "#566663" }}>
              Inicio
            </Button>
            <Button component={Link} to="/productos" sx={{ color: "#566663" }}>
              Productos
            </Button>
            <Button
              component={Link}
              to="/agradecimiento"
              sx={{ color: "#566663" }}
            >
              Agradecimiento
            </Button>
          </Box>

          <Box display="flex" alignItems="center" gap="8px">
            {user ? (
              <>
                <IconButton onClick={handleMenuOpen}>
                  <RiUserHeartLine size={24} color="#566663" />
                </IconButton>
                <Typography variant="body2" color="#566663">
                  Hola, {user?.username || "Usuario"}
                </Typography>
                <Menu
                  anchorEl={menuElement}
                  open={isMenuOpen}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
                </Menu>
              </>
            ) : (
              <IconButton component={Link} to="/login">
                <RiUserHeartLine size={24} color="#566663" />
              </IconButton>
            )}

            <IconButton onClick={() => navigate("/historial")}>
              <GiShoppingBag size={24} color="#566663" />
            </IconButton>

            <IconButton onClick={toggleDrawer(true)}>
              <Badge
                badgeContent={cart.reduce(
                  (total, item) => total + item.quantity,
                  0
                )}
                color="secondary"
                sx={{
                  ".MuiBadge-dot": {
                    backgroundColor: "#566663",
                  },
                  ".MuiBadge-colorSecondary": {
                    backgroundColor: "#566663",
                    color: "#DADDD8",
                  },
                }}
              >
                <TbShoppingCartHeart size={24} color="#566663" />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 350, padding: 2 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" sx={{ color: "#1C1C1C" }}>
              Carrito de compras
            </Typography>
            <IconButton onClick={toggleDrawer(false)}>
              <FaTimes size={20} color="#566663" />
            </IconButton>
          </Box>
          <Divider sx={{ backgroundColor: "#DADDD8" }} />
          <Carrito />
          {cart.length > 0 && (
            <Box sx={{ marginTop: 2, textAlign: "center" }}>
              <Button
                variant="contained"
                sx={{
                  marginTop: 2,
                  backgroundColor: "#1C1C1C",
                  color: "#EEF0F2",
                  "&:hover": {
                    backgroundColor: "#DADDD8",
                    color: "#1C1C1C",
                  },
                  padding: "10px 20px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "background-color 0.3s ease, color 0.3s ease",
                }}
                onClick={handleCheckout}
              >
                Realizar compra
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="warning" onClose={handleCloseSnackbar}>
          Debe iniciar sesión para poder proceder con la compra.
        </Alert>
      </Snackbar>
    </Box>
  );
};
