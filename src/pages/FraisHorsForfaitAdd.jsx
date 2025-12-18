import { useParams } from "react-router-dom";
import FraisHorsForfaitForm from "../components/FraisHorsForfaitForm";
import "../styles/FraisHorsForfait.css";

export default function FraisHorsForfaitAdd() {
  const { id } = useParams(); 

  return (
    <div className="frais-hors-forfait-container">
      <h2>Ajouter un frais hors forfait</h2>
      <FraisHorsForfaitForm idFrais={id} />
    </div>
  );
}
