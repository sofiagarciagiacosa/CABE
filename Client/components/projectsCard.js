export function createProjectCard(project) {
  return `
    <div class="col-12 col-md-6 col-lg-4">
      <div class="project-card" 
           data-id="${project.id}"
           onclick="window.location.href='http://localhost:3000/pages/proyecto/proyecto.html?id=${
             project.id
           }'">

        <h3 class="project-title">${project.nombre}</h3>
        <p class="project-brand">${project.cliente}</p>

        <div class="d-flex justify-content-between project-footer">
          <span class="project-members">${project.responsables || ""}</span>
        </div>
      </div>
    </div>
  `;
}

export function createAddCardButton() {
  return `
    <div class="col-12 col-md-6 col-lg-4">
      <div class="project-card add-project-btn d-flex align-items-center justify-content-center">
        <i class="bi bi-plus-lg" style="font-size: 2rem;"></i>
      </div>
    </div>
  `;
}

