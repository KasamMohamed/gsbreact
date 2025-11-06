import { createContext, useContext, useState } from 'react';

// 1. Création du contexte
const AuthContext = createContext();

// 2. Fournisseur du contexte (AuthProvider)
export function AuthProvider({ children }) {
  // 2a. État local pour stocker l'utilisateur (null = non connecté)
  const [user, setUser] = useState(null);

  // 3. Fonction de connexion
  const loginUser = (login, password) => {
    if (login === "Andre" && password === "secret") {
      setUser({ name: login }); 
      return true;
    } else {
      return false; 
    }
  };

  // 4. Fonction de déconnexion
  const logoutUser = () => {
    setUser(null); 
  };

  // 5. Valeurs exposées aux composants enfants
  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children} 
    </AuthContext.Provider>
  );
}

// 6. Hook personnalisé pour utiliser le contexte facilement
export function useAuth() {
  return useContext(AuthContext);
}
