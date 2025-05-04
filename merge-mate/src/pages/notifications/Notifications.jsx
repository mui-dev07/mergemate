import React, { useState } from "react";
import "../../styles/notifications.css";
import Button from "../../components/Button";
import PageLayout from "../../components/PageLayout";
import ResponsiveContainer from "../../components/ResponsiveContainer";

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
    {
      id: 4,
      type: "mention",
      content: "Maria mentioned you in a comment",
      project: "Project Delta",
      time: "2 days ago",
      read: true,
    },
    {
      id: 5,
      type: "review",
      content: "Changes requested on your PR #56",
      project: "Project Alpha",
      time: "3 days ago",
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

  const getIconBgClass = (type) => {
    switch (type) {
      case "mention":
        return "mention-bg";
      case "review":
        return "review-bg";
      case "task":
        return "task-bg";
      default:
        return "default-bg";
    }
  };

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notif) => ({ ...notif, read: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Header component
  const NotificationsHeader = (
    <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
      <div>
        <h2 className="mb-0">Notifications</h2>
        {unreadCount > 0 && (
          <p className="text-muted mb-0">You have {unreadCount} unread notifications</p>
        )}
      </div>
      <Button 
        variant="outline-primary"
        onClick={markAllAsRead}
        disabled={unreadCount === 0}
      >
        <i className="bi bi-check-all me-1"></i>
        Mark all as read
      </Button>
    </div>
  );

  return (
    <PageLayout
      title="Notifications"
      description="Your notification center"
      header={NotificationsHeader}
    >
      <div className="notifications-container">
        <div className="notifications-list animate-fade-in">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div
                key={notification.id}
                className={`notification-card ${
                  notification.read ? "read" : "unread"
                } animate-slide-up`}
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => markAsRead(notification.id)}
              >
                <div className={`notification-icon ${getIconBgClass(notification.type)}`}>
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
            ))
          ) : (
            <div className="empty-state text-center p-5">
              <i className="bi bi-bell-slash fs-1 text-muted mb-3"></i>
              <h5>No notifications</h5>
              <p className="text-muted">You're all caught up!</p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Notifications;
