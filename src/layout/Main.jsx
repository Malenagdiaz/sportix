import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Inicio from "../pages/Inicio";
import Productos from "../pages/Productos";
import ProductosDetalles from "../pages/ProductosDetalles";
import Checkout from "../pages/Checkout";
import Historial from "../pages/Historial";
import Agradecimiento from "../pages/Agradecimiento";
import LogIn from "../pages/LogIn";
import Register from "../pages/Register";
import NotFound from "../pages/404";

const Main = () => {
  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="productos" element={<Productos />} />
        <Route path="detalles" element={<ProductosDetalles />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="historial" element={<Historial />} />
        <Route path="agradecimiento" element={<Agradecimiento />} />
        <Route path="login" element={<LogIn />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
  );
};

export default Main;
