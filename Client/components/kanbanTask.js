export function renderTask(task) {
  let urgenciaClass = "";

  if (task.urgencia) {
    const nivel = task.urgencia.toLowerCase();
    if (nivel.includes("urgente")) urgenciaClass = "urgencia-alta";
    else if (nivel.includes("normal")) urgenciaClass = "urgencia-media";
    else urgenciaClass = "urgencia-baja";
  }
  return `
    <div class="kanban-task" draggable="true" data-id="${task._id}">
      <div class="task-title">${task.title}</div>

      ${
        task.urgencia
          ? `<span class="urgencia-badge ${urgenciaClass}">${task.urgencia}</span>`
          : ""
      }

      ${
        task.responsable
          ? `<div class="task-meta-box">${task.responsable}</div>`
          : ""
      }

      ${task.fecha ? `<div class="task-meta-box">${task.fecha}</div>` : ""}
    </div>
  `;
}
