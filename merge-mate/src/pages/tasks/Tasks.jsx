import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../../styles/Tasks.css";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import { useTheme } from "../../context/ThemeContext";

const Tasks = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  // Mock tasks data - replace with actual data later
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Update README documentation",
      project: "MergeMate",
      priority: "high",
      status: "in-progress",
      dueDate: "2024-03-25",
    },
    {
      id: 2,
      title: "Fix navigation responsiveness",
      project: "MergeMate",
      priority: "medium",
      status: "todo",
      dueDate: "2024-03-28",
    },
    {
      id: 3,
      title: "Implement user authentication",
      project: "MergeMate",
      priority: "high",
      status: "completed",
      dueDate: "2024-03-20",
    },
  ]);

  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter((task) =>
    filter === "all" ? true : task.status === filter
  );

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setTasks(items);
  };

  const handleAddNewTask = () => {
    navigate('/tasks/new');
  };

  // Tasks header component
  const TasksHeader = (
    <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
      <h4 className="mb-0 fw-bold">My Tasks</h4>
      <Button variant="primary" onClick={handleAddNewTask}>
        <i className="bi bi-plus-lg me-2"></i>Add New Task
      </Button>
    </div>
  );

  return (
    <PageLayout
      title="Tasks"
      description="Manage your MergeMate tasks"
      header={TasksHeader}
      className="tasks-page"
    >
      <div className="tasks-container animate-fade-in">
        <div className="row g-4">
          <div className="col-md-3 mb-4 mb-md-0">
            <div className={`filter-card p-3 rounded-3 shadow-sm ${isDarkMode ? 'filter-card-dark' : ''}`}>
              <h5 className="mb-3">Filters</h5>
              <div className="d-flex flex-column gap-2">
                {["all", "todo", "in-progress", "completed"].map((status) => (
                  <button
                    key={status}
                    className={`btn ${
                      filter === status ? "btn-primary" : "btn-outline-secondary"
                    } text-capitalize w-100 hover-effect`}
                    onClick={() => setFilter(status)}
                  >
                    {status.replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="col-md-9">
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="tasks">
                {(provided) => (
                  <div 
                    className="tasks-grid" 
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {filteredTasks.map((task, index) => (
                      <Draggable 
                        key={task.id} 
                        draggableId={task.id.toString()} 
                        index={index}
                      >
                        {(provided) => (
                          <div 
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className={`task-card p-4 rounded-3 shadow-sm ${isDarkMode ? 'task-card-dark' : ''}`}>
                              <div className="d-flex justify-content-between mb-3">
                                <span
                                  className={`priority-badge priority-${task.priority}`}
                                >
                                  {task.priority}
                                </span>
                                <div className="dropdown">
                                  <button
                                    className="btn btn-link p-0 task-menu-btn"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                  >
                                    <i className="bi bi-three-dots-vertical"></i>
                                  </button>
                                  <ul className="dropdown-menu">
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        Edit
                                      </a>
                                    </li>
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        Delete
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <h5 className="task-title mb-3">{task.title}</h5>
                              <div className="task-details">
                                <p className="mb-2">
                                  <i className="bi bi-folder me-2"></i>
                                  {task.project}
                                </p>
                                <p className="mb-2">
                                  <i className="bi bi-calendar me-2"></i>
                                  Due: {task.dueDate}
                                </p>
                                <div className={`status-badge status-${task.status}`}>
                                  {task.status.replace("-", " ")}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Tasks;
