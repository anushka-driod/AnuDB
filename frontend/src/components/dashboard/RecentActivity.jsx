import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getAnalytics } from "../../services/analyticsService";

export default function RecentActivity() {

  const [activities, setActivities] = useState([]);

  useEffect(() => {

    const loadActivity = async () => {

      try {

        const response =
          await getAnalytics();

        if (response.data.success) {

          setActivities(
            response.data.recentActivity || []
          );

        }

      } catch (error) {

        console.error(
          "Recent activity error:",
          error
        );

        toast.error(
          "Failed to load recent activity."
        );

      }

    };

    loadActivity();

  }, []);


  return (

    <div className="dashboard-panel">

      <h3>Recent Activity</h3>

      {activities.length === 0 ? (

        <p>
          No recent activity.
        </p>

      ) : (

        <ul className="activity-list">

          {activities.map(
            (activity, index) => (

              <li
                key={`${activity.activity_time}-${index}`}
              >
                {activity.message}
              </li>

            )
          )}

        </ul>

      )}

    </div>

  );
}