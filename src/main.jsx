import { createRoot } from "react-dom/client";
import App from "./App";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { ProductsProvider } from "./context/ProductsContext";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/ThemeProvider";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ProductsProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </AuthProvider>
    </ProductsProvider>
  </BrowserRouter>
);
