export function createProjectCard(project) {
  return `
        <div class="col-12 col-md-6 col-lg-4">
            <div class="project-card">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-brand">${project.brand}</p>

                <div class="d-flex justify-content-between project-footer">
                    <span class="project-members">${project.members}</span>
                    <span class="project-date">${project.date}</span>
                </div>
            </div>
        </div>
    `;
}

export function createAddCardButton() {
  return `
        <div class="col-12 col-md-6 col-lg-4">
            <button class="add-card-btn">
                <i class="bi bi-plus-lg"></i>
            </button>
        </div>
    `;
}
