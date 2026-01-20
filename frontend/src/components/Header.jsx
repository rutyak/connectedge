import { useState } from "react";
import { FiChevronDown, FiBell } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import { RiChat3Line } from "react-icons/ri";

function Header({ search, setSearch }) {
  const user = useSelector((state) => state.user);
  const requests = useSelector((state) => state.requests);
  const totalRequests = requests?.filter((req) => req.fromUserId !== null);

  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  return (
    <div className="w-full lg:h-[160px] bg-[#0f172a] border-b border-white/5 px-6 py-4 lg:py-6 flex flex-col justify-between transition-all duration-300">
      {/* Top Layer */}
      <div className="flex items-center justify-between gap-4">
        
        {/* Profile Section */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsOpenDropdown(true);
          }}
          className="group flex items-center gap-3 cursor-pointer bg-white/5 hover:bg-white/10 p-1.5 pr-4 rounded-2xl transition-all duration-300 border border-white/5 hover:border-blue-500/30"
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-blue-500/50 group-hover:border-blue-400 transition-colors">
              {user?.imageurl ? (
                <img src={user.imageurl} alt="profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold">
                  {user?.firstname?.charAt(0) || "U"}
                </div>
              )}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-[#0f172a] rounded-full"></div>
          </div>

          <div className="hidden sm:block">
            <p className="text-[11px] uppercase tracking-wider text-slate-400 font-bold leading-none mb-1">Welcome back</p>
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold text-sm capitalize">{user?.firstname || "User"}</span>
              <FiChevronDown className="text-slate-400 group-hover:text-blue-400 transition-transform group-hover:translate-y-0.5" />
            </div>
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-3">
          {/* Notifications/Requests */}
          <Link to="/dashboard/requests" className="group relative p-3 bg-white/5 hover:bg-blue-500/10 rounded-xl transition-all border border-white/5">
            <FiBell className="text-xl text-slate-300 group-hover:text-blue-400" />
            {totalRequests?.length > 0 && (
              <span className="absolute top-2 right-2.5 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative flex items-center justify-center rounded-full h-4 w-4 bg-blue-600 text-[10px] font-bold text-white">
                  {totalRequests.length}
                </span>
              </span>
            )}
          </Link>

          {/* Mobile Chat Link */}
          <Link
            to="/dashboard/chatlist"
            className="lg:hidden p-3 bg-white/5 hover:bg-blue-500/10 rounded-xl transition-all border border-white/5"
          >
            <RiChat3Line className="text-xl text-slate-300 hover:text-blue-400" />
          </Link>
        </div>
      </div>

      {/* Search Layer (Desktop) */}
      <div className="relative mt-6 hidden lg:block group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <IoIosSearch className="text-slate-400 text-xl group-focus-within:text-blue-400 transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Search people, messages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-800/40 text-white placeholder:text-slate-500 rounded-2xl pl-12 pr-4 py-3.5 border border-white/5 focus:border-blue-500/50 focus:bg-slate-800/60 outline-none transition-all shadow-inner"
        />
        <div className="absolute right-4 inset-y-0 flex items-center">
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 bg-slate-900 border border-white/10 rounded-md">
                CTRL + K
            </kbd>
        </div>
      </div>

      {isOpenDropdown && <Menu setIsOpenDropdown={setIsOpenDropdown} />}
    </div>
  );
}

export default Header;