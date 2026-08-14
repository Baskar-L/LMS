import {
  FiGrid,
  FiBookOpen,
  FiUsers,
  FiClipboard,
  FiShoppingBag,
} from "react-icons/fi";

import { NavLink } from "react-router-dom";

const menus = [
  {
    name: "Dashboard",
    path: "/",
    icon: <FiGrid />,
  },
  {
    name: "Courses",
    path: "/courses",
    icon: <FiBookOpen />,
  },
  {
    name: "Students",
    path: "/students",
    icon: <FiUsers />,
  },
  {
    name: "Enrollments",
    path: "/enrollments",
    icon: <FiClipboard />,
  },
  {
    name: "Shop Details",
    path: "/shop",
    icon: <FiShoppingBag />,
  },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-[#254593] text-white min-h-screen fixed left-0 top-0">
      <div className="h-16 flex items-center px-6 border-b border-white/20">
        <h2 className="text-xl font-bold">
          LMS Admin
        </h2>
      </div>

      <nav className="mt-5 px-3">
        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              `
              flex items-center gap-3
              px-4 py-3
              rounded-lg
              mb-2
              transition
              ${
                isActive
                  ? "bg-white text-[#254593]"
                  : "hover:bg-white/10"
              }
            `
            }
          >
            {menu.icon}

            <span>{menu.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;