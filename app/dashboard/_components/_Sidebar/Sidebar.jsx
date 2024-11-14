import NavItem from "./NavItem";
import {
  LuAccessibility,
  LuActivity,
  LuHome,
  LuListOrdered,
} from "react-icons/lu";

const Sidebar = () => {
  return (
    <nav className="w-1/6 h-[100vh] bg-blue-700 flex flex-col items-center py-20 justify-center gap-10">
      <NavItem icon={<LuHome className="text-4xl" />} path="/dashboard" />
      <NavItem
        icon={<LuListOrdered className="text-4xl" />}
        path="/dashboard/ordenes"
      />
      <NavItem
        icon={<LuAccessibility className="text-4xl" />}
        path="/dashboard/ejemplo"
      />
    </nav>
  );
};

export default Sidebar;
