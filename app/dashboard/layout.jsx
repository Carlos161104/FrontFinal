import Sidebar from "./_components/_Sidebar/Sidebar";
import Headers from "./_components/Headers";

const layoutDashboard = ({ children }) => {
  return (
    <div className="overflow-hidden h-full">
      <Headers />
      <div className="flex flex-row h-full">
        <Sidebar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default layoutDashboard;
