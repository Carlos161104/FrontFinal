import Sidebar from "./_components/_Sidebar/Sidebar";
import Headers from "./_components/Headers";

const layoutDashboard = ({ children }) => {
  return (
    <div className="overflow-hidden">
      <Headers />
      <div className="flex flex-row items-center ">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default layoutDashboard;
