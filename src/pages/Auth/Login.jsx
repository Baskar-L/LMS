import { useState } from "react";
import { FiShoppingBag } from "react-icons/fi";

import { useToast } from "../../context/ToastContext";

const Login = () => {
  const { showToast } =
    useToast();

  const [shop, setShop] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // const handleInstall = () => {
  //   if (!shop.trim()) {
  //     showToast(
  //       "warning",
  //       "Please enter your Shopify store domain"
  //     );

  //     return;
  //   }

  //   setLoading(true);

  //   window.location.href =
  //     `https://shopify-lms-api.onrender.com/api/auth/install?shop=${shop}`;
  // };


  const handleInstall = () => {
    const shopDomain = shop
      .trim()
      .toLowerCase();

    if (!shopDomain) {
      showToast(
        "warning",
        "Please enter your Shopify store domain"
      );
      return;
    }

    const shopRegex =
      /^[a-zA-Z0-9-]+\.myshopify\.com$/;

    if (!shopRegex.test(shopDomain)) {
      showToast(
        "error",
        "Enter a valid Shopify domain (example: store.myshopify.com)"
      );
      return;
    }

    setLoading(true);

    window.location.href =
      `https://shopify-lms-api.onrender.com/api/auth/install?shop=${shopDomain}`;
  };

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-[#254593]
        via-[#355fc4]
        to-[#6b8cff]
        flex
        items-center
        justify-center
        p-4
      "
    >
      <div
        className="
          bg-white
          w-full
          max-w-md
          rounded-3xl
          shadow-2xl
          p-8
        "
      >
        {/* Logo */}

        <div className="flex justify-center mb-5">
          <div
            className="
              w-16
              h-16
              rounded-2xl
              bg-[#254593]
              flex
              items-center
              justify-center
            "
          >
            <FiShoppingBag
              size={28}
              className="text-white"
            />
          </div>
        </div>

        {/* Heading */}

        <h1
          className="
            text-3xl
            font-bold
            text-center
            text-[#254593]
          "
        >
          Shopify LMS
        </h1>

        <p
          className="
            text-center
            text-gray-500
            mt-2
            mb-8
          "
        >
          Install and manage your
          learning platform inside
          Shopify
        </p>

        {/* Store Domain */}

        <div className="space-y-2">
          <label
            className="
              text-sm
              font-medium
              text-gray-700
            "
          >
            Shopify Store Domain
          </label>

          <input
            type="text"
            value={shop}
            onChange={(e) =>
              setShop(
                e.target.value
                  .replace(/\s/g, "")
                  .toLowerCase()
              )
            }
            placeholder="store-name.myshopify.com"
            className="
    w-full
    px-4
    py-3
    border
    border-gray-300
    rounded-xl
    outline-none
    focus:ring-2
    focus:ring-[#254593]
    focus:border-transparent
  "
          />
        </div>

        {/* Button */}

        <button
          onClick={handleInstall}
          disabled={loading}
          className="
            w-full
            mt-6
            bg-[#254593]
            hover:bg-[#1d3977]
            text-white
            font-semibold
            py-3
            rounded-xl
            transition
            disabled:opacity-50
          "
        >
          {loading
            ? "Redirecting..."
            : "Install App"}
        </button>

        {/* Footer */}

        <p
          className="
            text-xs
            text-center
            text-gray-400
            mt-5
          "
        >
          Enter your Shopify store
          URL to install LMS App
        </p>
      </div>
    </div>
  );
};

export default Login;