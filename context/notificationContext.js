import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./authContext";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [unreadCount, setUnreadCount] = useState(0);
    console.log("👤 user in NotificationContext:", user?._id ?? "no user");

    const fetchUnreadCount = async () => {
        console.log("🔄 fetchUnreadCount triggered");
        if (!user?._id) return;
        try {
            const res = await fetch(
                `https://api-motoxelerate.onrender.com/api/user/${user._id}/unread-count`
            );
            const data = await res.json();
            console.log("📦 unreadCount response:", data);
            setUnreadCount(data.unreadCount || 0);
        } catch (err) {
            console.error("❌ Failed to fetch unread count:", err);
        }
    };

    const markAllAsRead = async () => {
        if (!user?._id) return;
        try {
            const res = await fetch(
                `https://api-motoxelerate.onrender.com/api/notification/${user._id}/mark-read`,
                { method: "PUT" }
            );
            const data = await res.json();
            if (data.success) {
                setUnreadCount(0); // 🔥 Reset badge visually
            }
        } catch (err) {
            console.error("❌ Failed to mark notifications as read:", err);
        }
    };

    useEffect(() => {
        fetchUnreadCount();
    }, [user]);

    return (
        <NotificationContext.Provider
            value={{ unreadCount, fetchUnreadCount, markAllAsRead }}
        >
            {children}
        </NotificationContext.Provider>
    );
};
