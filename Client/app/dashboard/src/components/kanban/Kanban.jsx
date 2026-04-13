import KanbanColumn from "./KanbanColumn";

function Kanban({ columns, onAddTask, onTaskClick, onDropTask }) {
  return (
    <div className="kanban-board">
      {columns.map((col) => (
        <KanbanColumn
          key={col.title}
          column={col}
          onAddTask={onAddTask}
          onTaskClick={onTaskClick}
          onDropTask={onDropTask}
        />
      ))}
    </div>
  );
}

export default Kanban;