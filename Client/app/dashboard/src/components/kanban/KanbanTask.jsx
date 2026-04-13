function KanbanTask({ task, onClick, onDragStart }) {
  let urgenciaClass = "";

  if (task.urgencia) {
    const nivel = task.urgencia.toLowerCase();
    if (nivel.includes("urgente")) urgenciaClass = "urgencia-alta";
    else if (nivel.includes("normal")) urgenciaClass = "urgencia-media";
    else urgenciaClass = "urgencia-baja";
  }

  return (
    <div
      className="kanban-task"
      draggable
      data-id={task._id}
      onClick={() => onClick(task)}
      onDragStart={() => onDragStart(task._id)}
    >
      <div className="task-title">{task.title}</div>

      {task.urgencia && (
        <span className={`urgencia-badge ${urgenciaClass}`}>
          {task.urgencia}
        </span>
      )}

      {task.responsable && (
        <div className="task-meta-box">{task.responsable}</div>
      )}

      {task.fecha && (
        <div className="task-meta-box">{task.fecha}</div>
      )}
    </div>
  );
}

export default KanbanTask;