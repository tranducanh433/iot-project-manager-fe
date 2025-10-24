import { createContext, useContext, useEffect, useState } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const defaultNotifications = [
    {
      id: 1,
      toUser: [1],
      fromUser: 1,
      title: "Welcome!",
      content: "Join team now!",
      isRead: false,
      isAccept: null
    }
  ];

  const [notifications, setNotifications] = useState([]);

  // Load data from localStorage or default data
  useEffect(() => {
    const saved = localStorage.getItem("notifications");
    if (saved) {
      setNotifications(JSON.parse(saved));
    } else {
      setNotifications(defaultNotifications);
    }
  }, []);

  // Save to localStorage every time notifications change
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (newNoti) => {
    setNotifications([...notifications, newNoti]);
  };

  const updateNotification = (id, updateData) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, ...updateData } : n))
    );
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, updateNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationContext);


