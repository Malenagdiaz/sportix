import { Box, Typography, Link } from "@mui/material";
import { FaInstagram, FaTiktok, FaFacebookF } from "react-icons/fa";
import Visa from "../assets/visa.png";
import MasterCard from "../assets/mastercard.png";
import MP from "../assets/mercadopago.png";
import Naranja from "../assets/naranja.png";
import AmericanExpress from "../assets/americanexpress.png";
import Logo from "../assets/logo.png";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#EEF0F2",
        padding: "20px",
        textAlign: "center",
        boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)",
        width: "100%",
      }}
    >
      <Typography variant="h6" color="#566663" sx={{ mb: 1 }}>
        SPORTIX
      </Typography>

      <Box
        component="img"
        src={Logo}
        alt="Logo"
        sx={{
          width: 50,
          height: "auto",
          mb: 2,
        }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 3,
          mb: 2,
        }}
      >
        <Box sx={{ maxWidth: "200px", textAlign: "center" }}>
          <Typography variant="body2" color="#566663" sx={{ mb: 1 }}>
            Ponte en contacto
          </Typography>
          <Typography variant="body2" color="#566663">
            Contáctanos:{" "}
            <Link href="mailto:info@sportix.com" color="#566663">
              info@sportix.com
            </Link>
          </Typography>
        </Box>

        <Box sx={{ maxWidth: "200px", textAlign: "center" }}>
          <Typography variant="body2" color="#566663" sx={{ mb: 1 }}>
            Síguenos en redes sociales
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Link href="https://instagram.com" target="_blank" color="#566663">
              <FaInstagram size={24} />
            </Link>
            <Link href="https://tiktok.com" target="_blank" color="#566663">
              <FaTiktok size={24} />
            </Link>
            <Link href="https://facebook.com" target="_blank" color="#566663">
              <FaFacebookF size={24} />
            </Link>
          </Box>
        </Box>

        <Box sx={{ maxWidth: "200px", textAlign: "center" }}>
          <Typography variant="body2" color="#566663" sx={{ mb: 1 }}>
            Métodos de pago
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Box
              component="img"
              src={Visa}
              alt="Visa"
              sx={{
                width: 25,
                height: 25,
                objectFit: "contain",
              }}
            />
            <Box
              component="img"
              src={MasterCard}
              alt="Mastercard"
              sx={{
                width: 25,
                height: 25,
                objectFit: "contain",
              }}
            />
            <Box
              component="img"
              src={MP}
              alt="MercadoPago"
              sx={{
                width: 25,
                height: 25,
                objectFit: "contain",
              }}
            />
            <Box
              component="img"
              src={Naranja}
              alt="Naranja"
              sx={{
                width: 25,
                height: 25,
                objectFit: "contain",
              }}
            />
            <Box
              component="img"
              src={AmericanExpress}
              alt="AmericanExpress"
              sx={{
                width: 25,
                height: 25,
                objectFit: "contain",
              }}
            />
          </Box>
        </Box>
      </Box>

      <Typography variant="body2" color="#566663" sx={{ mt: 3 }}>
        © 2024 Malena D. Todos los derechos reservados.
      </Typography>
    </Box>
  );
};

export default Footer;
