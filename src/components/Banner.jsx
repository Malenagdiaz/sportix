import { Box, Typography } from "@mui/material";
import messibanner from "../assets/messibanner.png";

const Banner = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "50vh",
        minHeight: "300px",
        maxHeight: "550px",
        backgroundImage: `url(${messibanner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: "10px", sm: "20px" },
          left: { xs: "10px", sm: "20px" },
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            color: "black",
            padding: { xs: "0px 4px", sm: "2px 8px" },
            fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
          }}
        >
          NUEVA CAMISETA ARGENTINA
        </Typography>
        <Typography
          variant="body1"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            color: "black",
            padding: "2px 8px",
            fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
          }}
        >
          ¡Consíguela ahora con un 15% de descuento!
        </Typography>
      </Box>
    </Box>
  );
};

export default Banner;
