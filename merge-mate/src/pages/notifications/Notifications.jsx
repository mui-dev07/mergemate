import React, { useState } from "react";
import "../../styles/notifications.css";
import { Helmet } from "react-helmet-async";
import Button from "../../components/Button";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "mention",
      content: "You were mentioned in PR #123",
      project: "Project Alpha",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "review",
      content: "Your PR was approved",
      project: "Project Beta",
      time: "5 hours ago",
      read: false,
    },
    {
      id: 3,
      type: "task",
      content: "New task assigned: Update documentation",
      project: "Project Gamma",
      time: "1 day ago",
      read: true,
    },
  ]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case "mention":
        return "bi-at";
      case "review":
        return "bi-check-circle";
      case "task":
        return "bi-clipboard-check";
      default:
        return "bi-bell";
    }
  };

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  return (
    <>
      <Helmet>
        <title>Notifications | MergeMate</title>
      </Helmet>
      <div className="container-fluid bg-light min-vh-100 mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="notifications-container p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold">Notifications</h4>
                <Button variant="navbar" onClick={() => markAllAsRead()}>
                  Mark all as read
                </Button>
              </div>

              <div className="notifications-list">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`notification-card ${
                      notification.read ? "read" : "unread"
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="notification-icon">
                      <i
                        className={`bi ${getNotificationIcon(
                          notification.type
                        )}`}
                      ></i>
                    </div>
                    <div className="notification-content">
                      <div className="notification-header">
                        <h6 className="mb-0">{notification.project}</h6>
                        <span className="notification-time">
                          {notification.time}
                        </span>
                      </div>
                      <p className="mb-0">{notification.content}</p>
                    </div>
                    {!notification.read && (
                      <span className="unread-indicator"></span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;
