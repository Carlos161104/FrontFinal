import NavItem from "./NavItem";
import {
  LuFolderArchive,
  LuApple,
  LuHome,
  LuListOrdered,
  LuDollarSign,
} from "react-icons/lu";

const Sidebar = () => {
  return (
    <nav className="flex  min-w-[8.3333%] w-1/12 h-[100vh] bg-blue-700 flex-col items-center py-20 justify-center gap-10">
      <NavItem icon={<LuHome className="text-4xl" />} path="/dashboard" />
      <NavItem
        icon={<LuListOrdered className="text-4xl" />}
        path="/dashboard/ordenes"
      />
      <NavItem
        icon={<LuApple className="text-4xl" />}
        path="/dashboard/productos"
      />
      <NavItem
        icon={<LuFolderArchive className="text-4xl" />}
        path="/dashboard/guides"
      />
      <NavItem
        icon={<LuDollarSign className="text-4xl" />}
        path="/dashboard/cotizaciones"
      />
    </nav>
  );
};

export default Sidebar;
