import React, { useEffect } from "react";
import { useUser } from "../../context/userContext";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { fullUrl } from "../../utils/axios";
import { useSnackbar } from "notistack";

const GoogleAuth = () => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token") || null;
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();
  const { token: authToken, login } = useUser();

  useEffect(() => {
    const fetchGoogleAuth = async () => {
      if (!authToken && token) {
        localStorage.setItem("token", token); // This line should set `token` instead of `authToken`

        try {
          const result = await axios.post(
            `${fullUrl}/auth/verify-token`,
            { token },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (result.data.success) {
            const { data } = result.data;
            login(data.user, token);
            enqueueSnackbar("Login successful!", { variant: "success" });
            navigate("/");
          } else {
            enqueueSnackbar(result.message || "Something went wrong", {
              variant: "error",
            });
            localStorage.removeItem("token"); // Clear stored token if verification fails
            console.log(result?.data?.message);
          }
        } catch (error) {
          console.error("Token verification failed:", error);
        }
      } else {
        navigate("/");
      }
    };

    fetchGoogleAuth();
  }, [token, authToken, login, navigate]);

  return null;
};

export default GoogleAuth;
