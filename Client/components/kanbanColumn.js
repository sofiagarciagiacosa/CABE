import { renderTask } from "./kanbanTask.js";

export function renderColumn(column) {
  return `
    <div class="kanban-column" data-estado="${column.title}">
      <div class="kanban-header">
        <h2>${column.title}</h2>
        <span class="kanban-count">${column.tasks.length}</span>
      </div>

      <div class="kanban-underline" style="background-color:${
        column.color
      }"></div>

      ${column.tasks.map((task) => renderTask(task)).join("")}

      <button class="kanban-add-btn">+</button>
    </div>
  `;
}

