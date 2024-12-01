import { Modal, Box, Typography, Button } from "@mui/material";
import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";

const CompraFinalizada = ({ open, onClose }) => {
  const { clearCart } = useContext(ProductsContext);

  const handleClose = () => {
    clearCart();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#DADDD8",
          padding: 3,
          borderRadius: 2,
          width: { xs: "85%", md: "500px" },
          height: "250px",
          display: "flex",
          gap: "10px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          margin: "auto",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#1C1C1C",
            marginBottom: 2,
          }}
        >
          ¡Compra finalizada!
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#333",
            marginBottom: 3,
          }}
        >
          Gracias por confiar en nosotros. Tu compra ha sido procesada con
          éxito.
        </Typography>
        <Button
          onClick={handleClose}
          sx={{
            width: "35%",
            backgroundColor: "#495057",
            color: "white",
            "&:hover": {
              backgroundColor: "#212529",
            },
          }}
        >
          Cerrar
        </Button>
      </Box>
    </Modal>
  );
};

export default CompraFinalizada;
