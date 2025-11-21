export function renderTask(task) {
  return `
      <div class="kanban-task">
        <div class="task-title">${task.title}</div>
        ${task.meta ? `<div class="task-meta">${task.meta}</div>` : ""}
      </div>
    `;
}
