function AddClienteModal({ onClose }) {
  return (
    <div className="modal-overlay">

      <div className="add-cliente-modal">

        <div className="modal-header">

          <h2>Agregar Cliente</h2>

          <button onClick={onClose}>
            ✕
          </button>

        </div>

      </div>

    </div>
  );
}

export default AddClienteModal;