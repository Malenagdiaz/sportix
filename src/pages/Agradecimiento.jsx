import { Typography, Box } from "@mui/material";
import Argentina from "../assets/argentina.png";

const Agradecimiento = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: 2,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontWeight: "bold",
          marginBottom: 2,
          textAlign: "center",
          color: "#1C1C1C",
          fontSize: "4rem",
        }}
      >
        ¡Gracias por visitar SPORTIX!
      </Typography>
      <Typography
        variant="h5"
        sx={{
          marginBottom: 3,
          textAlign: "center",
          color: "#333",
        }}
      >
        Esperamos que hayas disfrutado explorando cada rincón de nuestra sección
        de fútbol.
      </Typography>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          color: "#6aa3da",
          marginBottom: 3,
        }}
      >
        ¡VAMOS ARGENTINA!
      </Typography>

      <Box
        component="img"
        src={Argentina}
        alt="Bandera Argentina"
        sx={{
          width: "430px",
          height: "auto",
          marginBottom: 3,
        }}
      />
    </Box>
  );
};

export default Agradecimiento;
