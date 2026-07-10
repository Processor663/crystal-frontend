import AsideBar from "../shared/SideBar/SideBar/SideBar";

function UserDashboard() {
  return (
    <div className="flex">
      <div className="w-[18%]  bg-surface">
        <AsideBar />
      </div>
      <div className="flex-1">Main</div>
    </div>
  );
}

export default UserDashboard;
