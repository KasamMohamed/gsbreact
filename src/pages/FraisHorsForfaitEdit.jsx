import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FraisHorsForfaitForm from "../components/FraisHorsForfaitForm";
import "../styles/FraisHorsForfait.css";

export default function FraisHorsForfaitEdit() {
  const { id, idHF } = useParams();
  const { token } = useAuth();

  const [fraisHF, setFraisHF] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFraisHF = async () => {
      try {
        const response = await axios.get(
          `http://gsb.julliand.etu.lmdsio.com/api/fraisHF/${idHF}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = Array.isArray(response.data) ? response.data[0] : response.data;
        setFraisHF(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur récupération fraisHF:", error);
        setLoading(false);
      }
    };

    fetchFraisHF();
  }, [idHF, token]);

  if (loading) return <div><b>Chargement…</b></div>;
  if (!fraisHF) return <div><b>Frais HF introuvable</b></div>;

  return (
    <div className="frais-hors-forfait-container">
      <h2>Modifier un frais hors forfait</h2>
      <FraisHorsForfaitForm idFrais={id} fraisHF={fraisHF} />
    </div>
  );
}
