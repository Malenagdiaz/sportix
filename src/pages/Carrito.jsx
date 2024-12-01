import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import {
  Box,
  Typography,
  List,
  ListItem,
  IconButton,
  Divider,
} from "@mui/material";
import { FaTrashAlt } from "react-icons/fa";

const Carrito = () => {
  const { cart, removeFromCart } = useContext(ProductsContext);

  let total = 0;

  cart.forEach((item) => {
    total += item.Precio * item.quantity;
  });

  return (
    <Box>
      <List>
        {cart.length > 0 ? (
          cart.map((item) => (
            <ListItem
              key={item.id}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
                padding: 1,
              }}
            >
              <Box
                component="img"
                src={item.imagenURL[0]}
                alt={item.Nombre}
                sx={{
                  width: "80px",
                  height: "auto",
                  borderRadius: 2,
                  objectFit: "cover",
                }}
              />

              <Box
                sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
              >
                <Typography sx={{ fontSize: "15px" }}>{item.Nombre}</Typography>

                <Typography sx={{ fontSize: "15px" }}>
                  Cantidad: {item.quantity}
                </Typography>
                <Typography sx={{ fontSize: "15px" }}>
                  Precio: ${item.Precio}
                </Typography>
              </Box>

              <IconButton color="error" onClick={() => removeFromCart(item.id)}>
                <FaTrashAlt size={18} />
              </IconButton>
            </ListItem>
          ))
        ) : (
          <Typography variant="body2" sx={{ marginTop: 2 }}>
            Tu carrito está vacío.
          </Typography>
        )}
      </List>
      <Divider />
      {cart.length > 0 && (
        <Box sx={{ marginTop: 2, textAlign: "center" }}>
          <Typography variant="h6">Total: $ {total}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Carrito;
