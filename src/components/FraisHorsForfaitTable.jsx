import "../styles/FraisHorsForfait.css";
import { useNavigate } from "react-router-dom";

export default function FraisHorsForfaitTable({
  idFrais,
  fraisHorsForfaitList,
  total,
  onBack,
  onDelete,
}) {
  const navigate = useNavigate();

  return (
    <>
      <table className="frais-hors-forfait-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Libellé</th>
            <th>Montant</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {fraisHorsForfaitList.map((frais) => (
            <tr key={frais.id_fraishorsforfait}>
              <td>{frais.date_fraishorsforfait}</td>
              <td>{frais.lib_fraishorsforfait}</td>
              <td>{frais.montant_fraishorsforfait}</td>
              <td>
                <button
                  type="button"
                  onClick={() =>
                    navigate(`/frais/${idFrais}/hors-forfait/modifier/${frais.id_fraishorsforfait}`)
                  }
                >
                  Modifier
                </button>

                <button
                  type="button"
                  onClick={() => onDelete(frais.id_fraishorsforfait)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="total">
        <strong>Total :</strong> {total} $
      </p>

      <div className="frais-hors-forfait-actions">
        <button
          type="button"
          onClick={() => navigate(`/frais/${idFrais}/hors-forfait/ajouter`)}
        >
          Ajouter
        </button>

        <button type="button" className="return-button" onClick={onBack}>
          Retour
        </button>
      </div>
    </>
  );
}
