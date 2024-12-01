import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Historial = () => {
  const [historial, setHistorial] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchHistorial = async () => {
      try {
        const ordersCollection = collection(db, "orders");
        const q = query(ordersCollection, where("usuario", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const orders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHistorial(orders);
      } catch (error) {
        console.error("Error al obtener el historial: ", error);
      }
    };

    fetchHistorial();
  }, [user, navigate]);

  return (
    <Box
      sx={{
        padding: 3,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 600, textAlign: "center" }}
      >
        Historial de compras
      </Typography>

      {!user ? (
        <Typography variant="body1" sx={{ textAlign: "left" }}>
          Debes estar logeado para ver tu historial de compras.
        </Typography>
      ) : historial.length > 0 ? (
        historial.map((order) => (
          <Card
            key={order.id}
            sx={{
              marginBottom: 3,
              borderRadius: 2,
              boxShadow: 3,
              overflow: "hidden",
              backgroundColor: "#f5f5f5",
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                Fecha de compra: {order.fecha}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                Total: ${order.total}
              </Typography>

              <Divider sx={{ margin: "10px 0" }} />

              <Typography
                variant="h6"
                sx={{ fontWeight: 500, marginBottom: 1 }}
              >
                Producto/s:
              </Typography>

              {order.productos.map((producto, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 2,
                    borderRadius: 2,
                    padding: 1,
                    backgroundColor: "#ffffff",
                    boxShadow: 1,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={producto.imagen}
                    alt={producto.nombre}
                    sx={{
                      width: 100,
                      height: 100,
                      objectFit: "cover",
                      marginRight: 2,
                    }}
                  />
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {producto.nombre}
                    </Typography>
                    <Typography variant="body2">
                      Cantidad: {producto.cantidad}
                    </Typography>
                    <Typography variant="body2">
                      Precio: ${producto.precio}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          No tienes compras registradas.
        </Typography>
      )}
    </Box>
  );
};

export default Historial;
