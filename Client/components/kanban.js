import { renderColumn } from "./kanbanColumn.js";

export function renderKanban(columns) {
  return `
    <div class="kanban-board">
      ${columns.map((col) => renderColumn(col)).join("")}
    </div>
  `;
}
