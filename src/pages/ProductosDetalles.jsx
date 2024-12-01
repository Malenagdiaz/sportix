import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useState, useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const ProductosDetalles = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useContext(ProductsContext);
  const product = location.state?.product;

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <Typography variant="h6" color="error">
        Producto no encontrado
      </Typography>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  const handleQuantityIncrement = () => {
    setQuantity((prev) => Math.min(prev + 1, product.Stock));
  };

  const handleQuantityDecrement = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  return (
    <Box sx={{ padding: 3 }}>
      <IconButton
        onClick={() => navigate("/productos")}
        sx={{ marginBottom: 2 }}
      >
        <AiOutlineArrowLeft size={24} color="#1C1C1C" />
      </IconButton>

      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            flex: 1,
            marginRight: { md: 2 },
            marginBottom: { xs: 2, md: 0 },
          }}
        >
          <Splide
            options={{
              type: "loop",
              perPage: 1,
              autoplay: true,
              interval: 3000,
              arrows: false,
              pagination: true,
            }}
          >
            {product.imagenURL.map((image, index) => (
              <SplideSlide key={index}>
                <CardMedia
                  component="img"
                  sx={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                  image={image}
                  alt={`${product.Nombre} - Imagen ${index + 1}`}
                />
              </SplideSlide>
            ))}
          </Splide>
        </Box>

        <Box sx={{ flex: 1 }}>
          <CardContent>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "#1C1C1C",
                textTransform: "uppercase",
              }}
            >
              {product.Nombre}
            </Typography>
            <Typography variant="h6" color="#333" sx={{ marginTop: "20px" }}>
              ${product.Precio}
            </Typography>
            <Typography variant="body1" color="#333" sx={{ marginTop: "20px" }}>
              {product.DescripcionLarga}
            </Typography>

            <Box
              sx={{ display: "flex", alignItems: "center", marginTop: "40px" }}
            >
              <Typography
                variant="body1"
                sx={{ marginRight: 1, color: "#333" }}
              >
                Cantidad:
              </Typography>
              <IconButton
                size="small"
                onClick={handleQuantityDecrement}
                disabled={quantity <= 1}
              >
                <FaMinus fontSize="small" />
              </IconButton>
              <TextField
                type="number"
                value={quantity}
                InputProps={{ readOnly: true }}
                size="small"
                sx={{
                  width: "60px",
                  "& input": {
                    textAlign: "center",
                  },
                }}
              />
              <IconButton
                size="small"
                onClick={handleQuantityIncrement}
                disabled={quantity >= product.Stock}
              >
                <FaPlus fontSize="small" />
              </IconButton>
            </Box>
          </CardContent>

          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <Button
              variant="contained"
              sx={{
                mb: { xs: "26px" },
                padding: "10px",
                fontSize: "1rem",
                background: "linear-gradient(45deg, #3b97d2, #bfe7f7)",
                color: "white",
                borderRadius: "30px",
                "&:hover": {
                  background: "linear-gradient(45deg, #bfe7f7, #3b97d2)",
                },
              }}
              onClick={handleAddToCart}
            >
              Agregar {quantity} al carrito
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default ProductosDetalles;
