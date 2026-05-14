import { useNavigate } from "react-router-dom";

function ClienteRow({ cliente }) {

  const navigate = useNavigate();

  const formatDate = (date) => {

    if (!date) return "-";

    return new Date(date).toLocaleDateString("es-AR");
  };

  

  return (
    <div
      className="table-row clientes-grid cliente-row"
      onClick={() => navigate(`/clientes/${cliente._id}`)}
    >

      <div className="cliente-name-cell">

        <div className="cliente-logo" />

        <span>{cliente.nombre}</span>

      </div>

      <span>{cliente.estado || "-"}</span>

      <span>{cliente.rubro || "-"}</span>

      <span>{cliente.email || "-"}</span>

      <span>
        {cliente.proyectos?.length || 0}
      </span>



      <span>
        {formatDate(cliente.createdAt)}
      </span>

    </div>
  );
}

export default ClienteRow;