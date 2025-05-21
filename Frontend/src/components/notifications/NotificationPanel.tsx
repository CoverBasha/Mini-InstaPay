import React, { useEffect, useState, useCallback } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import axios from 'axios';

interface Notification {
  id: number;
  message: string;
  time: string;
  userID: number;
}

// Create a custom event for notification refresh
export const REFRESH_NOTIFICATIONS_EVENT = 'refresh-notifications';

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async () => {
    try {
      const storedUser = localStorage.getItem('instaPay_user');
      if (!storedUser) {
        setError('User not found');
        setLoading(false);
        return;
      }

      const user = JSON.parse(storedUser);
      const response = await axios.get(`https://localhost:7312/api/notifications/getNotifications?userId=${user.userID}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        }
      });
      
      if (response.data) {
        setNotifications(response.data);
      }
    } catch (err) {
      setError('Failed to fetch notifications');
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();

    // Add event listener for refresh notifications
    const handleRefresh = () => {
      fetchNotifications();
    };

    window.addEventListener(REFRESH_NOTIFICATIONS_EVENT, handleRefresh);

    return () => {
      window.removeEventListener(REFRESH_NOTIFICATIONS_EVENT, handleRefresh);
    };
  }, [fetchNotifications]);

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 24 * 60) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          {loading ? (
            <div className="text-center text-muted-foreground">
              Loading notifications...
            </div>
          ) : error ? (
            <div className="text-center text-red-500">
              {error}
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center text-muted-foreground">
              No notifications to display.
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <p className="text-sm">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">{formatTime(notification.time)}</p>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationPanel; 