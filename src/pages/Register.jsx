import {
  Button,
  Typography,
  Container,
  TextField,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { MdVisibility, MdVisibilityOff, MdArrowBack } from "react-icons/md";

const Register = () => {
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = {
        username: data.username,
        mail: data.email,
        orders: [],
        cart: [],
        id: userCredential.user.uid,
      };

      await setDoc(doc(db, "users", user.id), user);
      navigate("/");
    } catch (error) {
      setLoginError(error.message);
    }
  };

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <Container
      sx={{
        mt: { xs: "50px", sm: "70px", md: "100px" },
        mb: { xs: "50px", sm: "70px", md: "100px" },
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
        Registrarse
      </Typography>

      <Container
        component="form"
        onSubmit={handleSubmit(onSubmit)}
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
        {loginError && (
          <Alert
            severity="error"
            sx={{ backgroundColor: "#FAFAFF", color: "#1C1C1C" }}
          >
            {loginError}
          </Alert>
        )}

        <TextField
          label="Usuario"
          placeholder="Nombre de Usuario"
          {...register("username", {
            required: "El nombre de usuario es obligatorio",
          })}
          error={!!errors.username}
          helperText={errors.username?.message}
          sx={{
            width: "100%",
            backgroundColor: "#FFFFFF",
            "& .MuiInputBase-root": {
              borderRadius: "8px",
            },
            "& .MuiInputLabel-root": {
              color: "#1C1C1C",
            },
            "& .MuiInputLabel-root.Mui-focused": {
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
          }}
        />

        <TextField
          label="Email"
          placeholder="Email"
          type="email"
          {...register("email", {
            required: "El email es obligatorio",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Dirección de email no válida",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{
            width: "100%",
            backgroundColor: "#FFFFFF",
            "& .MuiInputBase-root": {
              borderRadius: "8px",
            },
            "& .MuiInputLabel-root": {
              color: "#1C1C1C",
            },
            "& .MuiInputLabel-root.Mui-focused": {
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
          }}
        />

        <TextField
          label="Contraseña"
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          {...register("password", {
            required: "La contraseña es obligatoria",
            minLength: {
              value: 6,
              message: "La contraseña debe tener al menos 6 caracteres",
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  sx={{ color: "#1C1C1C" }}
                >
                  {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            width: "100%",
            backgroundColor: "#FFFFFF",
            "& .MuiInputBase-root": {
              borderRadius: "8px",
            },
            "& .MuiInputLabel-root": {
              color: "#1C1C1C",
            },
            "& .MuiInputLabel-root.Mui-focused": {
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
          Crear Cuenta
        </Button>
      </Container>
    </Container>
  );
};

export default Register;
