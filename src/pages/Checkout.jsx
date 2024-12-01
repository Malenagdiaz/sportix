import { useContext, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";
import {
  Container,
  Typography,
  Button,
  CardMedia,
  Divider,
} from "@mui/material";
import CompraFinalizada from "../pages/CompraFinalizada";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

const Checkout = () => {
  const { cart, setCart } = useContext(ProductsContext);
  const [openModal, setOpenModal] = useState(false);

  let total = 0;

  cart.forEach((item) => {
    total += item.Precio * item.quantity;
  });

  const handleCompletarCompra = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    setOpenModal(true);

    const resumenCompra = {
      usuario: user ? user.uid : "anonimo",
      fecha: new Date().toLocaleString(),
      total: total,
      productos: cart.map((item) => ({
        nombre: item.Nombre,
        cantidad: item.quantity,
        precio: item.Precio,
        imagen: item.imagenURL[0],
      })),
    };

    try {
      const ordersCollection = collection(db, "orders");
      await addDoc(ordersCollection, resumenCompra);
      setCart([]);
      setOpenModal(true);
    } catch (error) {
      console.error("Error al guardar la compra: ", error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Container
      sx={{
        padding: 3,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container
        sx={{
          padding: 3,
          marginBottom: 2,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#fff",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "#333", textAlign: "center" }}
        >
          DETALLES DE LA COMPRA
        </Typography>
        <Divider sx={{ marginTop: 2, marginBottom: "20px" }} />
        {cart.length > 0 ? (
          cart.map((item) => (
            <Container
              key={item.id}
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: 2,
                paddingBottom: 2,
                borderBottom: "1px solid #eee",
              }}
            >
              <CardMedia
                component="img"
                image={item.imagenURL[0]}
                alt={item.Nombre}
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: 1,
                  objectFit: "cover",
                  marginRight: 2,
                }}
              />
              <Container>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#444" }}
                >
                  {item.Nombre}
                </Typography>
                <Typography variant="body1" sx={{ color: "#555" }}>
                  Cantidad: {item.quantity}
                </Typography>
                <Typography variant="body1" sx={{ color: "#555" }}>
                  Precio: ${item.Precio * item.quantity}
                </Typography>
              </Container>
            </Container>
          ))
        ) : (
          <Typography variant="body1" sx={{ color: "#888" }}>
            Tu carrito está vacío.
          </Typography>
        )}
      </Container>

      <Container
        sx={{
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
            TOTAL DE LA COMPRA:
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#3b97d2" }}
          >
            ${total}
          </Typography>
        </Container>

        <Button
          variant="contained"
          onClick={handleCompletarCompra}
          sx={{
            padding: "10px",
            fontSize: "1rem",
            background: "linear-gradient(45deg, #3b97d2, #bfe7f7)",
            color: "white",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            "&:hover": {
              background: "linear-gradient(45deg, #bfe7f7, #3b97d2)",
              boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          Finalizar compra
        </Button>
      </Container>

      <CompraFinalizada open={openModal} onClose={handleCloseModal} />
    </Container>
  );
};

export default Checkout;
