import { useNavigate } from "react-router-dom";

function ClienteBoardCard({
  cliente,
}) {

  const navigate =
    useNavigate();

  return (
    <div
      className="cliente-board-card"
      onClick={() =>
        navigate(
          `/clientes/${cliente._id}`
        )
      }
    >

      {/* top */}

      <div className="cliente-board-top">

        <div className="cliente-board-logo">

          {cliente.logo ? (

            <img
              src={cliente.logo}
              alt={cliente.nombre}
            />

          ) : (

            <span>
              {cliente.nombre
                ?.split(" ")
                .slice(0, 2)
                .map(
                  (word) => word[0]
                )
                .join("")}
            </span>

          )}

        </div>

        <span
          className={`cliente-priority ${(
            cliente.prioridad ||
            "Media"
          ).toLowerCase()}`}
        >
          {cliente.prioridad ||
            "Media"}
        </span>

      </div>

      {/* nombre */}

      <h3 className="cliente-board-name">
        {cliente.nombre}
      </h3>

      {/* rubro */}

      <p className="cliente-board-rubro">
        {cliente.rubro || "Sin rubro"}
      </p>

      {/* contacto */}

      <div className="cliente-board-contact">

        <i className="bi bi-envelope" />

        <span>
          {cliente.email ||
            "Sin email"}
        </span>

      </div>

      {/* footer */}

      <div className="cliente-board-footer">

        <span>
          {cliente.proyectos
            ?.length || 0}{" "}
          proyecto
          {(cliente.proyectos
            ?.length || 0) !== 1
            ? "s"
            : ""}
        </span>

      </div>

    </div>
  );
}

export default ClienteBoardCard;