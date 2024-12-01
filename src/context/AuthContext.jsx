import { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  const getUserInfo = async (uid) => {
    try {
      const docRef = doc(db, "users", uid);
      const document = await getDoc(docRef);
      return document.exists() ? document.data() : null;
    } catch (err) {
      console.error("Error al obtener información del usuario:", err);
      return null;
    }
  };

  useEffect(() => {
    const isAuth = () => {
      onAuthStateChanged(auth, async (user) => {
        try {
          if (user) {
            const uid = user.uid;
            console.log(uid);
            const userInfo = await getUserInfo(uid);
            console.log(userInfo);
            setUser(userInfo);
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error("Error al obtener los datos del usuario:", error);
          setUser(null);
        }
      });
    };
    isAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
