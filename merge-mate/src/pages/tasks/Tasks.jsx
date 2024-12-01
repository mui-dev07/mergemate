import React, { useState } from "react";
import "../../styles/Tasks.css";
import { Helmet } from "react-helmet-async";

const Tasks = () => {
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

  const filteredTasks = tasks.filter(task => 
    filter === "all" ? true : task.status === filter
  );

  return (
    <>
      <Helmet>
        <title>Tasks | MergeMate</title>
      </Helmet>
      <div className="container-fluid bg-light min-vh-100 mt-5">
        <div className="row g-0">
          <div className="col-lg-3 col-md-4 sidebar-wrapper">
          <div className="p-3">
            <div className="filter-card p-3 rounded-3 bg-white shadow-sm">
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
        </div>

        <div className="col-lg-9 col-md-8 main-content">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0 fw-bold">My Tasks</h4>
            <button className="btn btn-primary shadow-sm hover-effect">
              <i className="bi bi-plus-lg me-2"></i>Add New Task
            </button>
          </div>

          <div className="row g-4">
            {filteredTasks.map((task) => (
              <div key={task.id} className="col-xl-6 col-xxl-4 col-md-12">
                <div className="task-card bg-white p-4 rounded-3 shadow-sm hover-card h-100">
                  <div className="d-flex justify-content-between mb-3">
                    <span className={`priority-badge priority-${task.priority}`}>
                      {task.priority}
                    </span>
                    <div className="dropdown">
                      <button className="btn btn-link text-dark p-0" type="button" data-bs-toggle="dropdown">
                        <i className="bi bi-three-dots-vertical"></i>
                      </button>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Edit</a></li>
                        <li><a className="dropdown-item" href="#">Delete</a></li>
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
            ))}
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Tasks; 