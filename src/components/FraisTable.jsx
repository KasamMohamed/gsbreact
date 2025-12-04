import { useState, useEffect } from "react";
import "../styles/FraisTable.css";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function FraisTable() {
  const [fraisList, setFraisList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterNonNull, setFilterNonNull] = useState(true);
  const [montantmax, setmontantmax] = useState("");
  const navigate = useNavigate();

  
  const {user, token} = useAuth();

  useEffect(() => { 
    const fetchFrais = async () => { 
      try { 
        const response = await 
        axios.get(`${API_URL}frais/liste/${user.id_visiteur}`, { 
          headers: { 
            Authorization: `Bearer ${token}`, 
          }, 
        });// Requête get à l'API à l'url 
        // 'http://gsb.julliand.etu.lmdsio.com/api/frais/liste/{id_visiteur}
        // TODO : Met à jour l'état avec les données de l'API 
        setFraisList(response.data);
        // // TODO : Met fin à l'état de chargement 
        setLoading(false);
        } catch (error) { 
          console.error('Erreur lors de la récupération des frais:', error); 
          setLoading(false);
        } 
      }; 
      
      fetchFrais(); // Appelle la fonction pour récupérer les données 
    }, []); // Tableau de dépendances vide = exécute une seule fois

  if (loading) return <div><b>Chargement des frais…</b></div>; 

const filteredFrais = fraisList
.filter((f) => !filterNonNull || f.montantvalide !== null)
.filter((frais) =>
    frais.anneemois.includes(searchTerm) ||
    frais.id_visiteur.toString().includes(searchTerm)
)
.filter((frais) => {
  if (montantmax === "") return true;
  const min = Number(montantmax);
  if (Number.isNaN(min)) return true;
  return frais.montantvalide !== null && frais.montantvalide >=min;
});

  return (

    <div className="frais-table-container">
      <h2>Liste des Frais</h2>

      <div className="filter-container">
        <label>
            <input
            type="checkbox"
            checked={filterNonNull}
            onChange={(e) => setFilterNonNull(e.target.checked)}
            />
            Afficher seulement les frais avec un montant validé
        </label>
      </div>

      <div className="search-container">
        <input
        type="text"
        placeholder="Rechercher par annee-mois, IDvisiteur"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Montant validé minimum"
          value={montantmax}
          onChange={(e) => setmontantmax(e.target.value)}
        />
      </div>

      <table className="frais-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>ID État</th>
            <th>Année-Mois</th>
            <th>ID Visiteur</th>
            <th>Nombre justificatifs</th>
            <th>Date modification</th>
            <th>Montant saisi</th>
            <th>Montant validé</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredFrais.map((frais) => (
            <tr key={frais.id_frais}>
              <td>{frais.id_frais}</td>
              <td>{frais.id_etat}</td>
              <td>{frais.anneemois}</td>
              <td>{frais.id_visiteur}</td>
              <td>{frais.nbjustificatifs}</td>
              <td>{frais.datemodification}</td>
              <td></td>
              <td>{frais.montantvalide}</td>
              <td> 
                <button onClick={() => navigate(`/frais/modifier/${frais.id_frais}`)} 
                        className="edit-button" 
                > 
                  Modifier 
                </button> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
