import axios from "axios";
import { useEffect, useRef } from "react";
import { FiUser, FiLogOut, FiUserPlus, FiLayers } from "react-icons/fi";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { removeUser } from "../../utils/userSlice";

const base_url = import.meta.env.VITE_APP_BACKEND_URL;

function Menu({ setIsOpenDropdown }) {
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    function handleDropdownClose(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpenDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleDropdownClose);
    return () => document.removeEventListener("mousedown", handleDropdownClose);
  }, [setIsOpenDropdown]);

  async function logout() {
    try {
      const res = await axios.post(
        `${base_url}/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      if (res.status === 200) {
        if (!toast.isActive("logoutToast")) {
          toast.success(res.data.message, { toastId: "logoutToast" });
        }
        navigate("/");
      }
    } catch (error) {
      if (!toast.isActive("logoutErrorToast")) {
        toast.error(error?.response?.data?.message || "Logout failed", {
          toastId: "logoutErrorToast",
        });
      }
    }
  }

  function handleMenu() {
    setIsOpenDropdown(false);
  }

  const menuItems = [
    { label: "Feeds", icon: <FiLayers />, path: "/dashboard", color: "text-blue-400" },
    { label: "Requests", icon: <FiUserPlus />, path: "/dashboard/requests", color: "text-cyan-400" },
    { label: "Profile", icon: <FiUser />, path: "/dashboard/profile", color: "text-indigo-400" },
    { label: "Premium", icon: <MdOutlineWorkspacePremium />, path: "/dashboard/premium", color: "text-amber-400" },
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-[2px]">
      <div
        ref={dropdownRef}
        onClick={(e) => e.stopPropagation()}
        className="absolute top-[75px] left-6 w-[240px] bg-[#0f172a] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in zoom-in duration-200"
      >
        {/* Decorative Header Area */}
        <div className="px-4 pt-4 pb-2">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 px-2 mb-2">
            Account Navigation
          </p>
        </div>

        <div className="px-2 pb-2">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200"
              to={item.path}
              onClick={handleMenu}
            >
              <span className={`${item.color} text-lg group-hover:scale-110 transition-transform`}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="px-2 pb-2">
          <div className="h-[1px] bg-white/5 mx-3 my-1" />
          
          <button
            className="group w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold text-rose-400 hover:bg-rose-500/10 transition-all duration-200"
            onClick={() => {
              logout();
              handleMenu();
            }}
          >
            <div className="p-1.5 rounded-lg bg-rose-500/10 group-hover:bg-rose-500/20 transition-colors">
              <FiLogOut className="text-rose-500" />
            </div>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Menu;