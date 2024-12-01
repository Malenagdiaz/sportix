import { useState } from "react";
import {
  Button,
  Typography,
  Container,
  TextField,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { MdVisibility, MdVisibilityOff, MdArrowBack } from "react-icons/md";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const LogIn = () => {
  const [loginError, setLoginError] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();

    signInWithEmailAndPassword(
      auth,
      e.target.email.value,
      e.target.password.value
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setLoginError(errorMessage);
      });
  };

  return (
    <Container
      sx={{
        mt: { xs: "60px", md: "100px" },
        mb: { xs: "60px", md: "100px" },
        maxWidth: { xs: "90%" },
        backgroundColor: "#EEF0F2",
        borderRadius: "10px",
        padding: "20px",
        position: "relative",
      }}
    >
      <IconButton
        onClick={() => navigate("/")}
        sx={{
          position: "absolute",
          top: "10px",
          left: "10px",
          color: "#1C1C1C",
        }}
      >
        <MdArrowBack size={24} />
      </IconButton>

      <Typography
        variant="h4"
        textAlign="center"
        mb="20px"
        sx={{ color: "#1C1C1C" }}
      >
        Iniciar Sesión
      </Typography>

      <Container
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: "400px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <TextField
          label="Email"
          placeholder="Email"
          type="email"
          name="email"
          required
          sx={{
            width: "100%",
            backgroundColor: "#FFFFFF",
            "& .MuiInputBase-root": {
              borderRadius: "8px",
            },
            "& .MuiInputLabel-root": {
              color: "#1C1C1C",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1C1C1C",
            },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#1C1C1C",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#1C1C1C",
            },
          }}
        />
        <TextField
          sx={{
            width: "100%",
            backgroundColor: "#FFFFFF",
            "& .MuiInputBase-root": {
              borderRadius: "8px",
            },
            "& .MuiInputLabel-root": {
              color: "#1C1C1C",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1C1C1C",
            },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#1C1C1C",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#1C1C1C",
            },
          }}
          label="Contraseña"
          type={passwordVisible ? "text" : "password"}
          placeholder="Password"
          name="password"
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  sx={{ color: "#1C1C1C" }}
                >
                  {passwordVisible ? <MdVisibilityOff /> : <MdVisibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            width: "100%",
            backgroundColor: "#1C1C1C",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#333333",
            },
            borderRadius: "8px",
            padding: "10px",
          }}
        >
          Iniciar Sesión
        </Button>
        <Typography
          variant="body2"
          textAlign="center"
          sx={{ color: "#1C1C1C" }}
        >
          ¿No tienes cuenta?{" "}
          <Link
            to="/register"
            style={{
              textDecoration: "none",
              color: "#1C1C1C",
              fontWeight: "bold",
            }}
          >
            Regístrate
          </Link>
        </Typography>
      </Container>

      {loginError && (
        <Alert
          severity="error"
          sx={{ mt: 2, backgroundColor: "#FAFAFF", color: "#1C1C1C" }}
        >
          {loginError}
        </Alert>
      )}
    </Container>
  );
};

export default LogIn;
