import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/FraisHorsForfait.css";

export default function FraisHorsForfaitForm({ idFrais, fraisHF = null }) {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [date, setDate] = useState("");
  const [libelle, setLibelle] = useState("");
  const [montant, setMontant] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (fraisHF) {
      setDate(fraisHF.date_fraishorsforfait || "");
      setLibelle(fraisHF.lib_fraishorsforfait || "");
      setMontant(fraisHF.montant_fraishorsforfait || "");
    }
  }, [fraisHF]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // AJOUT (IMPORTANT : mêmes noms que modif + id_frais)
      if (!fraisHF) {
        await axios.post(
          "http://gsb.julliand.etu.lmdsio.com/api/fraisHF/ajout",
          {
            id_frais: idFrais,
            date: date,
            libelle: libelle,
            montant: parseFloat(montant),
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      // MODIF (ton code OK)
      else {
        await axios.post(
          "http://gsb.julliand.etu.lmdsio.com/api/fraisHF/modif",
          {
            id_fraisHF: fraisHF.id_fraishorsforfait,
            date: date,
            libelle: libelle,
            montant: parseFloat(montant),
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      navigate(`/frais/${idFrais}/hors-forfait`);
    } catch (err) {
      console.error("Erreur envoi formulaire fraisHF:", err);
      setError(err.response?.data?.error || err.response?.data?.message || "Erreur lors de l'enregistrement");
    }
  };

  return (
    <div className="frais-form-container">
      {error && <div className="error-message">{error}</div>}

      <form className="frais-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Libellé</label>
          <input
            value={libelle}
            onChange={(e) => setLibelle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Montant</label>
          <input
            type="number"
            step="0.01"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
            required
          />
        </div>

        <button type="submit">{fraisHF ? "Modifier" : "Ajouter"}</button>

        <button
          type="button"
          className="return-button"
          onClick={() => navigate(-1)}
        >
          Annuler
        </button>
      </form>
    </div>
  );
}
