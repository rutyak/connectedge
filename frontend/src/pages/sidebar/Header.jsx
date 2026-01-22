import { useState } from "react";
import { FiChevronDown, FiBell } from "react-icons/fi";
import { SlPeople } from "react-icons/sl";

import { IoIosSearch } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import { RiChat1Line } from "react-icons/ri";


function Header({ search, setSearch }) {
  const user = useSelector((state) => state.user);
  const requests = useSelector((state) => state.requests);
  const totalRequests = requests?.filter((req) => req.fromUserId !== null);

  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  return (
    <div className="w-full flex-none sm:border-b sm:border-white/5 px-4 py-1 lg:px-6 lg:py-5 flex flex-col gap-5 bg-gradient-to-b from-white/[0.02] to-transparent">
      <div className="flex items-center justify-between gap-4">
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsOpenDropdown(true);
          }}
          className="group flex items-center gap-3 cursor-pointer sm:bg-slate-400/5 hover:bg-blue-500/10 p-1.5 pr-4 sm:rounded-2xl transition-all duration-300 sm:border sm:border-white/5 hover:border-blue-500/30 shadow-sm"
        >
          <div className="relative">
            <div className="w-11 h-11 rounded-xl overflow-hidden border-2 border-blue-500/20 group-hover:border-blue-500/50 transition-all duration-300 shadow-lg">
              {user?.imageurl ? (
                <img
                  src={user.imageurl}
                  alt="profile"
                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold">
                  {user?.firstname?.charAt(0) || "U"}
                </div>
              )}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-[#020617] rounded-full shadow-glow"></div>
          </div>

          <div className="hidden sm:block">
            <p className="text-[10px] uppercase tracking-[0.15em] text-blue-400/80 font-black leading-none mb-1.5">
              Welcome back
            </p>
            <div className="flex items-center gap-2">
              <span className="text-slate-100 font-bold text-[15px] tracking-tight capitalize">
                {user?.firstname || "User"}
              </span>
              <FiChevronDown className="text-slate-500 group-hover:text-blue-400 transition-transform duration-300 " />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/dashboard/requests"
            className="hidden lg:block group relative p-3 bg-white/5 hover:bg-blue-500/10 rounded-xl transition-all border border-white/5 hover:border-blue-500/20"
          >
            <SlPeople className="text-xl text-slate-400 group-hover:text-blue-400 transition-colors" />
            {totalRequests?.length > 0 && (
              <span className="absolute top-2 right-2 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                <span className="relative flex items-center justify-center rounded-full h-4 w-4 bg-blue-600 text-[9px] font-black text-white ring-2 ring-[#020617]">
                  {totalRequests.length}
                </span>
              </span>
            )}
          </Link>

          <Link
            to="/dashboard/chatlist"
            className="lg:hidden p-3 bg-white/5 hover:bg-blue-500/10 rounded-xl transition-all border border-white/5 hover:border-blue-500/20"
          >
            <RiChat1Line className="text-xl text-slate-400 group-hover:text-blue-400" />
          </Link>
        </div>
      </div>

      <div className="relative hidden lg:block group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <IoIosSearch className="text-slate-500 text-xl group-focus-within:text-blue-400 transition-colors duration-300" />
        </div>
        <input
          type="text"
          name="search-input"
          placeholder="Search people, messages..."
          value={search}
          autoComplete="off"
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-900/40 text-slate-100 placeholder:text-slate-600 rounded-xl pl-12 pr-4 py-3 border border-white/5 focus:border-blue-500/40 focus:bg-slate-900/80 outline-none transition-all duration-300 text-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)] focus:ring-4 focus:ring-blue-500/5"
        />
      </div>

      {isOpenDropdown && <Menu setIsOpenDropdown={setIsOpenDropdown} />}
    </div>
  );
}

export default Header;
