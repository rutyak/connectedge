import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addUser } from "../../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { X, ArrowLeft, Loader2 } from "lucide-react";
import ResetPassword from "./ResetPassword";
import Login from "./Login";
import SignUp from "./SignUp";
import VerifyOtp from "./VerifyOtp";
import ForgotPassword from "./ForgotPassword";

const base_url = import.meta.env.VITE_APP_BACKEND_URL;

function Auth({ loginToggle, setLoginToggle }) {
  const [authView, setAuthView] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const modelRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let token = document.cookie
      .split(";")
      .find((row) => row.trim().startsWith("token="))
      ?.split("=")[1];
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    if (!loginToggle) return;
    const handleClickOutside = (e) => {
      if (modelRef.current && !modelRef.current.contains(e.target)) {
        setLoginToggle(false);
      }
    };
    const handleEscapeKey = (e) => e.key === "Escape" && setLoginToggle(false);

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [loginToggle]);

  useEffect(() => {
    if (!loginToggle) return;

    const handleScroll = () => {
      setLoginToggle(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loginToggle]);

  const handleChanges = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (authView === "login" || authView === "signup") {
        const endpoint = authView === "login" ? "login" : "signup";
        const res = await axios.post(`${base_url}/${endpoint}`, formData, {
          withCredentials: true,
        });
        toast.success(res.data?.message);
        dispatch(addUser(res.data?.user));
        setLoginToggle(false);
        if (res.status === 200) navigate("/dashboard");
      } else if (authView === "forgotPassword") {
        const res = await axios.post(`${base_url}/send-otp`, {
          email: formData.email,
        });
        toast.success(res.data?.message);
        if (res.status === 200) setAuthView("verifyOtp");
      } else if (authView === "verifyOtp") {
        const res = await axios.post(`${base_url}/verify-otp`, {
          email: formData.email,
          otp: formData.otp,
        });
        toast.success(res.data?.message);
        if (res.status === 200) setAuthView("resetPassword");
      } else if (authView === "resetPassword") {
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          return;
        }
        const res = await axios.patch(`${base_url}/reset-password`, {
          email: formData.email,
          password: formData.password,
        });
        toast.success(res.data?.message);
        if (res.status === 200) setAuthView("login");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      toast.error(errorMsg);
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {loginToggle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div
            ref={modelRef}
            className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-10 max-w-md w-full relative overflow-hidden"
          >
            <button
              onClick={() => setLoginToggle(false)}
              className="absolute right-6 top-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            {authView !== "login" && authView !== "signup" && (
              <button
                onClick={() => setAuthView("login")}
                className="absolute left-6 top-6 p-2 text-gray-400 hover:text-blue-600 flex items-center gap-1 text-sm font-medium"
              >
                <ArrowLeft size={18} />
              </button>
            )}

            <div className="mt-4 mb-8 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                {authView === "login" && "Welcome Back"}
                {authView === "signup" && "Create Account"}
                {authView === "forgotPassword" && "Reset Password"}
                {authView === "verifyOtp" && "Verify Email"}
                {authView === "resetPassword" && "New Password"}
              </h2>
              <p className="text-gray-500 mt-2 text-sm sm:text-sm">
                {authView === "login" &&
                  "Enter your details to access your account"}
                {authView === "signup" && "Join our community today"}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r-xl animate-shake">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {authView === "login" && (
                <Login
                  setAuthView={setAuthView}
                  setError={setError}
                  handleChanges={handleChanges}
                />
              )}
              {authView === "signup" && (
                <SignUp handleChanges={handleChanges} />
              )}
              {authView === "forgotPassword" && (
                <ForgotPassword handleChanges={handleChanges} />
              )}
              {authView === "verifyOtp" && (
                <VerifyOtp handleChanges={handleChanges} />
              )}
              {authView === "resetPassword" && (
                <ResetPassword handleChanges={handleChanges} />
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98] disabled:opacity-70 flex justify-center items-center gap-2"
              >
                {isLoading && <Loader2 className="animate-spin" size={20} />}
                {isLoading
                  ? "Processing..."
                  : authView === "login"
                  ? "Sign In"
                  : authView === "signup"
                  ? "Create Account"
                  : "Continue"}
              </button>
            </form>

            {(authView === "login" || authView === "signup") && (
              <>
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-100"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-4 text-gray-400 font-medium">
                      Or join with
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => (window.location.href = `${base_url}/google`)}
                  className="w-full flex items-center justify-center gap-3 py-3.5 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all font-semibold text-gray-700 mb-6"
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="G"
                    className="w-5 h-5"
                  />
                  Google Account
                </button>

                <p className="text-center text-sm text-gray-600 font-medium">
                  {authView === "login" ? "New here? " : "Member already? "}
                  <button
                    onClick={() =>
                      setAuthView(authView === "login" ? "signup" : "login")
                    }
                    className="text-blue-600 hover:text-blue-700 font-bold underline-offset-4 hover:underline"
                  >
                    {authView === "login" ? "Create an account" : "Log in"}
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Auth;
