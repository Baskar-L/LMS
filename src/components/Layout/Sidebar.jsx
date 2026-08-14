import {
  FiGrid,
  FiBookOpen,
  FiUsers,
  FiClipboard,
  FiShoppingBag,
  FiX,
} from "react-icons/fi";

import {
  NavLink,
} from "react-router-dom";

import {
  useLayout,
} from "../../context/LayoutContext";

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
  const {
    sidebarOpen,
    setSidebarOpen,
  } = useLayout();

  return (
    <>
      {sidebarOpen && (
        <div
          onClick={() =>
            setSidebarOpen(false)
          }
          className="
            fixed
            inset-0
            bg-black/50
            z-40
            lg:hidden
          "
        />
      )}

      <aside
        className={`
          fixed
          top-0
          left-0
          z-50
          w-64
          bg-[#254593]
          text-white
          min-h-screen
          transition-transform
          duration-300

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >
        <div
          className="
            h-16
            flex
            items-center
            justify-between
            px-5
            border-b
            border-white/20
          "
        >
          <h2 className="font-bold text-xl">
            Shopify LMS
          </h2>

          <button
            onClick={() =>
              setSidebarOpen(false)
            }
            className="lg:hidden"
          >
            <FiX size={24} />
          </button>
        </div>

        <nav className="p-3">
          {menus.map((menu) => (
            <NavLink
              key={menu.path}
              to={menu.path}
              onClick={() =>
                setSidebarOpen(false)
              }
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-lg
                mb-2

                ${
                  isActive
                    ? "bg-white text-[#254593]"
                    : "hover:bg-white/10"
                }
              `
              }
            >
              {menu.icon}
              {menu.name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;