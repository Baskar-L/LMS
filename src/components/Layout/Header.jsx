import {
  FiUser,
  FiMenu,
  FiLogOut,
} from "react-icons/fi";

import {
  useState,
} from "react";

import Modal from "../Common/Modal";

import useAuth from "../../hooks/useAuth";

import {
  useLayout,
} from "../../context/LayoutContext";

const Header = () => {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const {
    logout,
  } = useAuth();

  const {
    setSidebarOpen,
  } = useLayout();

  const [
    openLogout,
    setOpenLogout,
  ] = useState(false);

  return (
    <>
      <header
        className="
          h-16
          bg-white
          border-b
          px-4
          md:px-6
          flex
          items-center
          justify-between
        "
      >
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden"
            onClick={() =>
              setSidebarOpen(true)
            }
          >
            <FiMenu size={24} />
          </button>

          <h1 className="font-semibold lg:hidden">
            Shopify LMS
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <p className="text-sm font-medium">
              {user?.shopDomain}
            </p>

            <p className="text-xs text-gray-500">
              Admin
            </p>
          </div>

          <div
            className="
              w-10
              h-10
              rounded-full
              bg-[#254593]
              text-white
              flex
              items-center
              justify-center
            "
          >
            <FiUser />
          </div>

          <button
            onClick={() =>
              setOpenLogout(true)
            }
          >
            <FiLogOut
              size={20}
              className="text-red-500"
            />
          </button>
        </div>
      </header>

      <Modal
        isOpen={openLogout}
        onClose={() =>
          setOpenLogout(false)
        }
        title="Logout"
        size="md"
      >
        <div className="space-y-4">
          <p>
            Are you sure you want to
            logout?
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() =>
                setOpenLogout(false)
              }
              className="
                px-4
                py-2
                border
                rounded-lg
              "
            >
              Cancel
            </button>

            <button
              onClick={logout}
              className="
                px-4
                py-2
                bg-red-500
                text-white
                rounded-lg
              "
            >
              Logout
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Header;