import ElectionStatsRow from "@/components/shared/StatCard/StatCard";

function UserDashboard() {
  return (
      <div className="flex-1">
        <div className="stat-container">
          <ElectionStatsRow />
        </div>
      </div>
  
  );
}

export default UserDashboard;
