import { useState, useEffect } from "react";
import "../styles/FraisForm.css";
import axios from "axios";
import { API_URL, getCurrentUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function FraisForm({ frais = null }) {
  const [idFrais, setIdFrais] = useState(null);
  const [anneeMois, setAnneeMois] = useState("");
  const [nbJustificatifs, setNbJustificatifs] = useState("");
  const [montant, setMontant] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Pré-remplir le formulaire si on modifie un frais existant 
  useEffect(() => { 
    if (frais) { 
      setIdFrais(frais.id_frais); 
      setMontant(frais.montantvalide || ''); 
      setAnneeMois(frais.anneemois || '');
      setNbJustificatifs(frais.nbjustificatifs || '');
      // TODO : compléter en affectant la valeur à anneeMois et nbJustificatifs 
      } 
    }, [frais]);

  const handleSubmit = async (e) => {
    e.preventDefault();                    
    setLoading(true);                      
    setError("");                          

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token manquant");
      }

      //const fraisData = {
        //anneemois: anneeMois,
        //nbjustificatifs: parseInt(nbJustificatifs, 10),
        //id_visiteur: getCurrentUser()["id_visiteur"],
      //};

      //const response = await 
      //axios.post(`${API_URL}frais/ajout`, fraisData,{
          //headers: { Authorization: `Bearer ${token}` },
        //}
      //);

      const fraisData = {
        anneemois: anneeMois,
        nbjustificatifs: parseInt(nbJustificatifs, 10),
      };

      if (frais) {// Mise à jour d'un frais existant (UPDATE) 
       fraisData["id_frais"] = idFrais; // ajoute id_frais au JSON fraisData

       fraisData["montantvalide"] = parseFloat(montant); 
       // TODO : compléter la requête 
       const response = await axios.post( 
        // TODO : passer l’url de modification (voir le tableau au début du doc), 
        `${API_URL}frais/modif`,
        // TODO : passer l’objet JSON du body,
        fraisData,
        // TODO : passer le token dans les headers
        {
          headers: { Authorization: `Bearer ${token}`},
        }  
        ); 
        console.log(response) 
      } else { // Ajout d'un nouveau frais (CREATE)
        fraisData["id_visiteur"]= getCurrentUser()["id_visiteur"];
      // TODO : Ajouter id_visiteur à fraisData 
      const response = await axios.post(`${API_URL}frais/ajout`, 
        fraisData, 
        {
        headers: { Authorization: `Bearer ${token}` }, 
      }
    ); 
      console.log(response) 
    }

      navigate("/dashboard");
    } catch (err) {
      console.error("Erreur:", err);
      setError(err.response?.data?.message || err.message ||
          "Erreur lors de l'enregistrement"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="frais-form-container">
      <h2>{frais ? 'Modifier le frais' : 'Saisir un frais'}</h2>

      {error && <div className="error-message">{error}</div>}

      <form className="frais-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Année-Mois (ex: 202310):</label>
          <input
            type="text"
            value={anneeMois}
            onChange={(e) => setAnneeMois(e.target.value)}
            placeholder='ex : "202310"'
            required
          />
        </div>

        <div className="form-group">
          <label>Nombre justificatifs:</label>
          <input
            type="number"
            value={nbJustificatifs}
            onChange={(e) => setNbJustificatifs(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Montant (en $):</label>
          <input
            type="number"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
          />
        </div>
        <Link className="frais-hors-forfait-link" to={`/frais/${idFrais}/hors-forfait`}>Frais hors forfait</Link>

        <button type="submit" disabled={loading}>
          {loading ? "Enregistrement..." : "Ajouter"}
        </button>
      </form>
    </div>
  );
}
