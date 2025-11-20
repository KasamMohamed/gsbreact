import FraisTable from "../components/FraisTable";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div>
      <h1>Tableau de bord</h1>
      {user ? (<p>Bienvenue {user?.nom_visiteur}</p>) : (<p>Bonjour !</p>)}
      <FraisTable/>
    </div>
  );
}
