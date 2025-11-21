export function renderProjectDescription(project) {
  return `
      <div class="field">
        <div class="label">NOMBRE</div>
        <div class="value">${project.nombre}</div>
      </div>
  
      <div class="field">
        <div class="label">DESCRIPCIÓN</div>
        <div class="value">${project.descripcion}</div>
      </div>
  
      <div class="field">
        <div class="label">CLIENTE</div>
        <div class="value">${project.cliente}</div>
      </div>
  
      <div class="field">
        <div class="label">PRESUPUESTO</div>
        <div class="value">${project.presupuesto}</div>
      </div>
  
      <div class="field">
        <div class="label">FECHA DE INICIO</div>
        <div class="value">${project.inicio}</div>
      </div>
  
      <div class="field">
        <div class="label">FECHA LÍMITE</div>
        <div class="value">${project.fin}</div>
      </div>
  
      <div class="field">
        <div class="label">RESPONSABLES</div>
        <div class="value">${project.responsables}</div>
      </div>
    `;
}
