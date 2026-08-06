import CandidateTable from "./CandidateTable/CandidateTable";
import DangerZone from "./DangerZone/DangerZone";
import ElectionSchedule from "./ElectionSchedule/ElectionSchedule";


const AdminManagement = () => {
  return (
    <div className="space-y-5">
      <CandidateTable />
      <ElectionSchedule />
      <DangerZone activeElectionTitle="SUG Election 2026" />
    </div>
  );
};

export default AdminManagement;
