function ClientInteractionCard({
  interaccion,
}) {

  return (
    <div className="interaction-card">

      <div className="interaction-top">

        <span className="interaction-type">
          {interaccion.tipo}
        </span>

        <span className="interaction-date">
          {new Date(
            interaccion.fecha
          ).toLocaleDateString("es-AR")}
        </span>

      </div>

      <p className="interaction-description">
        {interaccion.descripcion}
      </p>

    </div>
  );
}

export default ClientInteractionCard;