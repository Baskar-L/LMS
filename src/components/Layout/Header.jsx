import { FiUser } from "react-icons/fi";

const Header = () => {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <div>
        <h1 className="text-lg font-semibold text-gray-800">
          Shopify LMS
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#254593] text-white flex items-center justify-center">
          <FiUser size={18} />
        </div>

        <div>
          <p className="text-sm font-medium text-gray-800">
            {user?.shopDomain || "Merchant"}
          </p>

          <p className="text-xs text-gray-500">
            Admin
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;