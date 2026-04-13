import KanbanTask from "./KanbanTask";

function KanbanColumn({
  column,
  onAddTask,
  onTaskClick,
  onDragStart,
  onDrop
}) {
  return (
    <div
      className="kanban-column"
      data-estado={column.title}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDrop(column.title)}
    >
      <div className="kanban-header">
        <h2>{column.title}</h2>
        <span className="kanban-count">{column.tasks.length}</span>
      </div>

      <div
        className="kanban-underline"
        style={{ backgroundColor: column.color }}
      ></div>

      {column.tasks.map((task) => (
        <KanbanTask
          key={task._id}
          task={task}
          onClick={onTaskClick}
          onDragStart={onDragStart}
        />
      ))}

      <button
        className="kanban-add-btn"
        onClick={() => onAddTask(column.title)}
      >
        +
      </button>
    </div>
  );
}

export default KanbanColumn;