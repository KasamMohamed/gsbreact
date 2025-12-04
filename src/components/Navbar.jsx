import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import '../styles/Navbar.css';

function Navbar() {
  const { user, logoutUser } = useAuth(); 

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-links">
          <span className="navbar-logo">GSB Frais</span>
          <Link to="/">Accueil</Link>
          {user && <Link to="/dashboard">Tableau de bord</Link>}
          {user && <Link to="/frais/ajouter">Ajouter frais</Link>}
        </div>

        <div className="navbar-auth">
          {user ? (
            <button onClick={logoutUser} style={{ color: 'white', background: 'none', border:'none'}}>Déconnexion</button>
          ) : (
            <Link to="/login">Connexion</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
