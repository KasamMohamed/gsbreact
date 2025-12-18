import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FraisHorsForfaitTable from "../components/FraisHorsForfaitTable";
import "../styles/FraisHorsForfait.css";

export default function FraisHorsForfait() {
  const { id } = useParams(); // id_frais
  const navigate = useNavigate();
  const { token } = useAuth();

  const [fraisHorsForfaitList, setFraisHorsForfaitList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchFraisHorsForfaitList = async () => {
    try {
      const response = await axios.get(
        `http://gsb.julliand.etu.lmdsio.com/api/fraisHF/liste/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setFraisHorsForfaitList(response.data);

      // calcul du total
      let somme = 0;
      response.data.forEach((fraisHorsForfait) => {
        somme += parseFloat(fraisHorsForfait.montant_fraishorsforfait);
      });
      setTotal(somme);

      setLoading(false);
    } catch (error) {
      console.error("Erreur récupération frais hors forfait :", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFraisHorsForfaitList();
    // eslint-disable-next-line
  }, [id]);

  // Etape 4 : suppression
  const handleDelete = async (idHF) => {
    if (!window.confirm("Supprimer ce frais hors forfait ?")) return;

    try {
      await axios.delete("http://gsb.julliand.etu.lmdsio.com/api/fraisHF/suppr", {
        data: { id_fraishorsforfait: idHF },
        headers: { Authorization: `Bearer ${token}` },
      });

      setFraisHorsForfaitList(
        fraisHorsForfaitList.filter((f) => f.id_fraishorsforfait !== idHF)
      );

      // recalcul total
      let somme = 0;
      fraisHorsForfaitList
        .filter((f) => f.id_fraishorsforfait !== idHF)
        .forEach((f) => (somme += parseFloat(f.montant_fraishorsforfait)));
      setTotal(somme);
    } catch (error) {
      console.error("Erreur suppression fraisHF:", error);
    }
  };

  if (loading) return <div><b>Chargement des frais hors forfait…</b></div>;

  return (
    <div className="frais-hors-forfait-container">
      <h2>Frais hors forfait</h2>

      <FraisHorsForfaitTable
        idFrais={id}
        fraisHorsForfaitList={fraisHorsForfaitList}
        total={total}
        onBack={() => navigate(`/frais/modifier/${id}`)}
        onDelete={handleDelete}
      />
    </div>
  );
}
