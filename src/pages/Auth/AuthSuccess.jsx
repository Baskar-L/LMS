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
        <div className="flex items-center justify-center min-h-screen">
            Logging in...
        </div>
    );
};

export default AuthSuccess;