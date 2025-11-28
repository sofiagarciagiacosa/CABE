// components/modalProject.js
export function renderProjectModal() {
  return `
      <div id="projectModal" class="project-modal d-none">
        <div class="project-modal-card">
          <h2 class="modal-title">Detalles del proyecto</h2>
  
          <form id="projectForm">
            <div class="form-grid">
              <label>NOMBRE</label>
              <input type="text" id="nombre" required />
  
              <label>DESCRIPCIÓN</label>
              <input type="text" id="descripcion" required />
  
              <label>CLIENTE</label>
              <select id="clienteSelect"></select>
  
              <label>PRESUPUESTO</label>
              <input type="number" id="presupuesto" required />
  
              <label>RESPONSABLES</label>
              <div id="responsablesContainer"></div>

              <label>FECHA INICIO</label>
              <input type="date" id="fechaInicio" />

  
              <label>FECHA LÍMITE</label>
              <input type="date" id="fechaLimite" />
            </div>
  
            <div class="modal-buttons">
              <button type="submit" class="btn-save">Guardar</button>
              <button type="button" class="btn-cancel" id="cancelBtn">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
}
