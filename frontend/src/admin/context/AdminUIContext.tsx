import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { notifications as seed, type AdminNotification } from "@/admin/data/dummy";

type AdminUIContextValue = {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
  notifOpen: boolean;
  setNotifOpen: (v: boolean) => void;
  quickOpen: boolean;
  setQuickOpen: (v: boolean) => void;
  notifications: AdminNotification[];
  unreadCount: number;
  markAllRead: () => void;
  clearNotifications: () => void;
  removeNotification: (id: string) => void;
};

const AdminUIContext = createContext<AdminUIContextValue | null>(null);

export function AdminUIProvider({ children }: { children: ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);
  const [notifications, setNotifications] = useState<AdminNotification[]>(seed);

  const toggleSidebar = useCallback(() => setSidebarCollapsed((v) => !v), []);
  const markAllRead = useCallback(
    () => setNotifications((list) => list.map((n) => ({ ...n, read: true }))),
    [],
  );
  const clearNotifications = useCallback(() => setNotifications([]), []);
  const removeNotification = useCallback(
    (id: string) => setNotifications((list) => list.filter((n) => n.id !== id)),
    [],
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AdminUIContext.Provider
      value={{
        sidebarCollapsed,
        toggleSidebar,
        mobileOpen,
        setMobileOpen,
        notifOpen,
        setNotifOpen,
        quickOpen,
        setQuickOpen,
        notifications,
        unreadCount,
        markAllRead,
        clearNotifications,
        removeNotification,
      }}
    >
      {children}
    </AdminUIContext.Provider>
  );
}

export function useAdminUI() {
  const ctx = useContext(AdminUIContext);
  if (!ctx) throw new Error("useAdminUI must be used inside AdminUIProvider");
  return ctx;
}
