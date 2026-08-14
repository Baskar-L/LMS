import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const AuthSuccess = () => {
    const navigate = useNavigate();
    const [params] = useSearchParams();

    useEffect(() => {
        const loginUser = async () => {
            const token = params.get("token");

            if (!token) {
                navigate("/", { replace: true });
                return;
            }

            try {
                localStorage.setItem("token", token);

                const response = await axios.get(
                    "https://shopify-lms-api.onrender.com/api/auth/me",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.data)
                );

                console.log("Token Saved:", token);
                console.log("User Saved:", response.data.data);
                console.log("Local User:", localStorage.getItem("user"));
                console.log("Local Token:", localStorage.getItem("token"));

                navigate("/", { replace: true });
            } catch (error) {
                console.error(error);

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                navigate("/login", { replace: true });
            }
        };

        loginUser();
    }, [navigate, params]);

    return (
        <div
            className="
      min-h-screen
      flex
      flex-col
      items-center
      justify-center
      bg-gray-50
    "
        >
            <div
                className="
        w-16
        h-16
        border-4
        border-[#254593]
        border-t-transparent
        rounded-full
        animate-spin
      "
            />

            <h2
                className="
        mt-6
        text-xl
        font-semibold
        text-[#254593]
      "
            >
                Signing You In...
            </h2>

            <p className="text-gray-500 mt-2">
                Please wait while we verify
                your Shopify account.
            </p>
        </div>
    );
};

export default AuthSuccess;