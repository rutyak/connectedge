import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Header from "./sidebar/Header";
import { toast } from "react-toastify";
import { addRequests } from "../utils/requestsSlice";
import ChatList from "./chatpanel/ChatList";
import { addUser, removeUser } from "../utils/userSlice";
import { useConnectionsContext } from "../context/ConnectionsContext";

const base_url = import.meta.env.VITE_APP_BACKEND_URL;

function Dashboard() {
  const { getConnections } = useConnectionsContext();
  const userData = useSelector((state) => state.user);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location?.search);
    const userDataFromGoogle = params.get("user");

    if (userDataFromGoogle && JSON.parse(userDataFromGoogle)) {
      dispatch(addUser(JSON.parse(userDataFromGoogle)));
    }
  }, [location, dispatch]);

  useEffect(() => {
    if (userData === null) {
      navigate("/");
    }
  }, [userData, navigate]);

  async function getRequests() {
    try {
      const res = await axios.get(`${base_url}/user/requests`, {
        withCredentials: true,
      });
      dispatch(addRequests(res.data?.requests));
    } catch (error) {
      if (
        error.response?.data?.message === "jwt expired" ||
        error.response?.data?.message === "Please login"
      ) {
        if (!toast.isActive("authExpiredToast")) {
          toast.error("Please log in again.", { toastId: "authExpiredToast" });
        }
        dispatch(removeUser());
        navigate("/");
      }
      console.error(error);
    }
  }

  useEffect(() => {
    getConnections();
    getRequests();
  }, []);

  return (
    <div
      data-testid="dashboard"
      className="min-h-screen flex flex-col lg:flex-row bg-[#020617]"
    >
      <div className="fixed z-50 w-full bg-[#0a192f] lg:bg-[#020617] lg:h-screen lg:max-w-[340px] flex flex-col border-r border-white/10 shadow-2xl">
        <div className="relative">
          <Header search={search} setSearch={setSearch} />
        </div>

        <div className="overflow-auto hidden lg:flex flex-col flex-1 bg-[#020617] backdrop-blur-xl">
          <ChatList search={search} />
        </div>
      </div>

      <div className="flex-1 lg:h-screen relative w-full bg-[#0a192f] overflow-auto pt-[68px] lg:pt-0 lg:ml-[340px]">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-30">
          <div className="absolute -top-[10%] -right-[10%] w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[10%] -left-[10%] w-[400px] h-[400px] bg-cyan-500/10 blur-[100px] rounded-full"></div>
        </div>

        <div className="relative z-10 h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
