"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItem = ({ icon, path }) => {
  const pathName = usePathname();
  return (
    <div>
      <Link href={path} className="w-full justify-center">
        <span
          className={
            pathName == path
              ? "w-10/12 bg-blue-400 flex justify-center rounded-md transition-all py-2"
              : "transition-all w-10/12 py-2"
          }
        >
          {icon}
        </span>
      </Link>
    </div>
  );
};

export default NavItem;
