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
        paddingTop: "20px",
        paddingBottom: "20px",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontWeight: "bold",
          marginBottom: 2,
          textAlign: "center",
          color: "#1C1C1C",
          fontSize: {
            xs: "2rem",
            sm: "3rem",
            md: "4rem",
          },
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
          fontSize: {
            xs: "1rem",
            sm: "1.25rem",
            md: "1.5rem",
          },
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
          fontSize: {
            xs: "1.25rem",
            sm: "1.75rem",
            md: "3rem",
          },
        }}
      >
        ¡VAMOS ARGENTINA!
      </Typography>

      <Box
        component="img"
        src={Argentina}
        alt="Bandera Argentina"
        sx={{
          maxWidth: { xs: "200px", md: "430px" },
          height: "auto",
        }}
      />
    </Box>
  );
};

export default Agradecimiento;
