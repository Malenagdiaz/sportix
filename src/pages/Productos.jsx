import { useContext, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  CardMedia,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";

const Productos = () => {
  const { products, isLoading } = useContext(ProductsContext);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  const filteredProducts =
    filter === "Todas" || filter === ""
      ? products
      : products.filter((product) => product.Categoría === filter);

  const categoriasUnicas = [
    ...new Set(products.map((product) => product.Categoría)),
  ];

  if (isLoading) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ marginTop: 2 }}
      >
        <CircularProgress />
        <Typography variant="h6" component="p" sx={{ marginTop: 1 }}>
          Cargando productos...
        </Typography>
      </Grid>
    );
  }

  return (
    <Box>
      <Grid container justifyContent="flex-end">
        <FormControl
          sx={{
            width: "230px",
            marginRight: "15px",
            marginTop: "20px",
            backgroundColor: "white",
            borderColor: "#1C1C1C",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              borderColor: "#1C1C1C",
            },
            "&.Mui-focused": {
              borderColor: "#bfe7f7",
              boxShadow: "0 0 0 3px rgba(191, 231, 247, 0.5)",
            },
          }}
          size="small"
        >
          <InputLabel id="categoria-select-label" sx={{ color: "#1C1C1C" }}>
            Categoría
          </InputLabel>
          <Select
            labelId="categoria-select-label"
            id="categoria-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            label="Categoría"
            sx={{
              color: "#1C1C1C",
              "& .MuiSelect-icon": {
                color: "#1C1C1C",
              },
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            <MenuItem value="Todas" sx={{ color: "#1C1C1C" }}>
              Todas
            </MenuItem>
            {categoriasUnicas.map((categoria) => (
              <MenuItem
                key={categoria}
                value={categoria}
                sx={{ color: "#1C1C1C" }}
              >
                {categoria}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid container spacing={4} sx={{ padding: 2 }}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                borderRadius: "16px",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.03)",
                },
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderTopLeftRadius: "16px",
                  borderTopRightRadius: "16px",
                }}
                image={product.imagenURL?.[0]}
                alt={product.Nombre}
              />
              <CardContent sx={{ flexGrow: 1, padding: "16px" }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
                >
                  {product.Nombre}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ marginTop: "10px" }}
                  color="#6c757d"
                >
                  {product.Descripcion}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#1C1C1C",
                    marginTop: "20px",
                  }}
                >
                  ${product.Precio}
                </Typography>
              </CardContent>
              <Button
                sx={{
                  borderRadius: "30px",
                  padding: "12px 20px",
                  margin: "16px auto",
                  width: "90%",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  background: "linear-gradient(45deg, #3b97d2, #bfe7f7)",
                  color: "white",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
                    background: "linear-gradient(45deg, #bfe7f7, #3b97d2)",
                  },
                }}
                onClick={() => navigate("/detalles", { state: { product } })}
              >
                Ver más
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Productos;
