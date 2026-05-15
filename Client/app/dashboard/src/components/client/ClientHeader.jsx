import { useNavigate } from "react-router-dom";

function ClientHeader({ cliente }) {

  const navigate = useNavigate();

  return (
    <>

      <div className="client-topbar">

        <button
          className="client-back-btn"
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-arrow-left" />
        </button>

        <span className="client-page-label">
          Perfil del Cliente
        </span>

      </div>

      <div className="client-divider" />

      <div className="client-hero">

        <div className="client-hero-logo">

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
                .map((word) => word[0])
                .join("")}
            </span>

          )}

        </div>

        <div className="client-hero-info">

          <h1>{cliente.nombre}</h1>

        </div>

      </div>

    </>
  );
}

export default ClientHeader;