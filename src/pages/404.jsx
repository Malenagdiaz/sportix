import { Box, Typography } from "@mui/material";
import NotFoundImage from "../assets/404.png";

const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        component="img"
        src={NotFoundImage}
        alt="Imagen 404"
        sx={{
          width: 250,
          height: "auto",
          marginBottom: 3,
        }}
      />
      <Box sx={{ textAlign: "center" }}>
        <Typography color="#1C1C1C" sx={{ fontSize: "1.2rem" }}>
          Lo sentimos, la página que buscas no existe.
        </Typography>
      </Box>
    </Box>
  );
};

export default NotFound;
