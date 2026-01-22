import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Input from "./Input";

const base_url = import.meta.env.VITE_APP_BACKEND_URL;

function ChangePassword({ showPasswordFields, setShowPasswordFields }) {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  async function handlePasswordChange() {
    const { oldPassword, newPassword, confirmPassword } = passwords;

    if (!newPassword || !oldPassword || !confirmPassword) {
      return toast.error("Please fill in all password fields.");
    }

    if (oldPassword === newPassword) {
      return toast.error("You have already used this password");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("New password and confirm password do not match.");
    }

    setIsLoading(true);
    try {
      const res = await axios.patch(`${base_url}/change-password`, passwords, {
        withCredentials: true,
      });

      if (res.status === 200) {
        toast.success(res.data?.message || "Password changed successfully");
        setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
        setShowPasswordFields(false);
      }
    } catch (error) {
      console.error(error);
      if (!toast.isActive("passwordChangeErrorToast")) {
        toast.error(
          error.response?.data?.message || "Failed to change password.",
          { toastId: "passwordChangeErrorToast" },
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-4 md:mt-6 transition-all duration-300">
      <label className="block text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 ml-1">
        Security & Access
      </label>

      {/* Main Row: Stays as a flexible row on all screens */}
      <div className="flex items-center justify-between w-full bg-white/5 border border-white/10 p-3 md:p-4 rounded-xl md:rounded-2xl transition-all mb-4">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">
            Current Password
          </span>
          <p className="text-sm md:text-base font-bold text-white tracking-[0.3em] opacity-50">
            ••••••••
          </p>
        </div>
        <button
          onClick={() => setShowPasswordFields(!showPasswordFields)}
          className={`text-xs md:text-sm px-4 py-2 rounded-lg font-bold transition-all duration-300 ${
            showPasswordFields
              ? "bg-white/10 text-slate-300 hover:bg-white/20"
              : "bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600 hover:text-white"
          }`}
        >
          {showPasswordFields ? "CANCEL" : "CHANGE"}
        </button>
      </div>

      {/* Expandable Form: 1 col on mobile, 2 col on tablet/laptop */}
      {showPasswordFields && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 p-4 md:p-5 rounded-2xl bg-white/[0.02] border border-white/5 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="col-span-1 md:col-span-2">
            <Input
              label="Current Password"
              type="password"
              name="oldPassword"
              placeholder="Confirm old password"
              value={passwords.oldPassword}
              onChange={handleChange}
            />
          </div>

          <Input
            label="New Password"
            type="password"
            name="newPassword"
            placeholder="Min. 8 characters"
            value={passwords.newPassword}
            onChange={handleChange}
          />

          <Input
            label="Confirm New Password"
            type="password"
            name="confirmPassword"
            placeholder="Repeat new password"
            value={passwords.confirmPassword}
            onChange={handleChange}
          />

          <div className="col-span-1 md:col-span-2 mt-2">
            <button
              disabled={isLoading}
              className="w-full flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-xl md:rounded-2xl hover:opacity-90 active:scale-[0.98] disabled:opacity-50 transition-all font-bold text-sm tracking-widest uppercase shadow-lg shadow-emerald-500/20"
              onClick={handlePasswordChange}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  UPDATING...
                </span>
              ) : (
                "UPDATE PASSWORD"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChangePassword;
