import { useState } from "react";

const Login = () => {
  const [shop, setShop] =
    useState("");

  const handleInstall = () => {
    if (!shop) {
      return alert(
        "Enter shop domain"
      );
    }

    window.location.href =
      `http://localhost:5000/api/auth/install?shop=${shop}`;
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-[#254593]">
          Shopify LMS
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Install Shopify App
        </p>

        <input
          type="text"
          value={shop}
          onChange={(e) =>
            setShop(e.target.value)
          }
          placeholder="store-name.myshopify.com"
          className="input-box mt-6"
        />

        <button
          onClick={handleInstall}
          className="primary-btn w-full mt-4"
        >
          Install App
        </button>

      </div>
    </div>
  );
};

export default Login;