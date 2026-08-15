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
      px-4
    "
    >
      <div
        className="
        bg-white
        w-full
        max-w-lg
        rounded-3xl
        shadow-2xl
        p-10
      "
      >
        {/* Logo */}

        <div className="flex justify-center mb-6">
          <div
            className="
            w-20
            h-20
            rounded-3xl
            bg-[#254593]
            flex
            items-center
            justify-center
            shadow-lg
          "
          >
            <FiShoppingBag
              size={36}
              className="text-white"
            />
          </div>
        </div>

        {/* Heading */}

        <h1
          className="
          text-4xl
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
          mt-3
          mb-8
          text-base
          leading-relaxed
        "
        >
          Install and manage your learning
          platform directly inside your
          Shopify store
        </p>

        {/* Store Domain */}

        <div className="space-y-2">
          <label
            className="
            text-sm
            font-semibold
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
            h-14
            px-4
            border
            border-gray-300
            rounded-xl
            text-base
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
          h-14
          mt-8
          bg-[#254593]
          hover:bg-[#1d3977]
          text-white
          font-semibold
          rounded-xl
          transition-all
          duration-300
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
          text-sm
          text-center
          text-gray-400
          mt-6
        "
        >
          Enter your Shopify store URL to
          install the LMS App
        </p>
      </div>
    </div>
  );
};

export default Login;