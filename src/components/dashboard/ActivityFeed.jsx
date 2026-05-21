import React from "react";
import { Bell, CheckCircle, Calendar } from "lucide-react";
import "./ActivityFeed.css";

const ActivityFeed = ({ notifications }) => {
  return (
    <div className="activity-feed-card glass">
      <div className="card-header">
        <h3>Recent Activity</h3>
      </div>
      <div className="activity-list">
        {notifications.length === 0 ? (
          <p className="empty-message">No recent activity</p>
        ) : (
          notifications.map((notif) => (
            <div key={notif.id} className="activity-item">
              <div className="activity-icon">
                {notif.type === "task" ? (
                  <CheckCircle size={16} />
                ) : (
                  <Bell size={16} />
                )}
              </div>
              <div className="activity-content">
                <p>{notif.message}</p>
                <small>{new Date(notif.timestamp).toLocaleString()}</small>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;
