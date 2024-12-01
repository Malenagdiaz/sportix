import { createContext, useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity:
            updatedCart[existingProductIndex].quantity + product.quantity,
        };
        return updatedCart;
      }

      const newCart = [...prevCart, { ...product, quantity: product.quantity }];
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const refProductos = collection(db, "productos");
        const docsProductos = await getDocs(refProductos);
        const fetchedProducts = docsProductos.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        isLoading,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
