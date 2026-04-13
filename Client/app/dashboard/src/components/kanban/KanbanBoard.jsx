import KanbanColumn from "./KanbanColumn";

function KanbanBoard({ columns, onAddTask, onTaskClick, onDragStart, onDrop }) {
  return (
    <div className="kanban-board">
      {columns.map((col) => (
        <KanbanColumn
          key={col.title}
          column={col}
          onAddTask={onAddTask}
          onTaskClick={onTaskClick}
          onDragStart={onDragStart}
          onDrop={onDrop}
        />
      ))}
    </div>
  );
}

export default KanbanBoard;