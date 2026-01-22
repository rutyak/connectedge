import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { removeRequest } from "../utils/requestsSlice";
import { FaHeart, FaCheck, FaTimes } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { useConnectionsContext } from "../context/ConnectionsContext";

const base_url = import.meta.env.VITE_APP_BACKEND_URL;

const Requests = () => {
  const { getConnections } = useConnectionsContext();
  const requests = useSelector((state) => state.requests);
  const dispatch = useDispatch();

  const handleReview = async (status, id) => {
    try {
      const res = await axios.post(
        `${base_url}/request/review/${status}/${id}`,
        {},
        { withCredentials: true },
      );

      await getConnections();
      dispatch(removeRequest(id));

      toast.success(
        <div className="flex flex-col">
          <span className="font-bold text-[10px] uppercase tracking-widest text-cyan-400">
            {status === "accepted"
              ? "Connection Established"
              : "Transmission Dismissed"}
          </span>
          <span className="text-[11px] text-slate-300">
            {res.data?.message}
          </span>
        </div>,
      );
    } catch (error) {
      toast.error(error.message || "Action failed");
    }
  };

  return (
    <div className="min-h-screen w-full text-white">
      <div className="max-w-5xl mx-auto px-4 py-4 md:py-6">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-6 xl:mb-12 text-center">
          <div className="hidden sm:flex w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 items-center justify-center mb-4 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
            <HiOutlineUserGroup className="text-3xl text-cyan-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 hidden xl:block">
            Pending Transmissions
          </h2>
          <p className="text-slate-500 text-xs md:text-sm tracking-[0.3em] uppercase font-bold">
            Incoming Connection Signals
          </p>
        </div>

        {/* Request Cards Container */}
        {!requests || requests.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-16 border border-white/5 rounded-[2rem] bg-white/[0.02]">
            <p className="text-slate-500 italic">
              No incoming signals detected.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests?.map(
              (req) =>
                req?.fromUserId && (
                  <div
                    key={req._id}
                    className="group relative bg-[#0f172a]/50 border border-white/10 rounded-2xl p-4 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-cyan-500/40 hover:bg-[#0f172a]/80 transition-all duration-300"
                  >
                    {/* User Info Left */}
                    <div className="flex sm:flex-row items-center gap-5 w-full sm:w-auto">
                      <div className="relative shrink-0">
                        <img
                          src={req.fromUserId?.imageurl}
                          alt="profile"
                          className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover border border-white/10"
                        />
                        {req.status === "superinterested" && (
                          <div className="absolute -top-2 -right-2 bg-[#020617] p-1.5 rounded-full border border-red-500/50 shadow-lg">
                            <FaHeart className="text-red-500 text-[10px] animate-pulse" />
                          </div>
                        )}
                      </div>

                      <div className="sm:text-center sm:text-left">
                        <div className="flex items-center justify-center sm:justify-start gap-3 mb-1">
                          <h3 className="text-xl md:text-2xl font-bold text-slate-100">
                            {req.fromUserId?.firstname}{" "}
                            {req.fromUserId?.lastname}
                          </h3>
                          <span className="text-cyan-400 font-bold text-sm">
                            {req.fromUserId?.age}{" "}
                            <span className="text-[10px] uppercase opacity-60">
                              yrs
                            </span>
                          </span>
                        </div>
                        <p className="text-slate-400 text-sm md:text-base font-medium">
                          {req.fromUserId?.job || "Industry Professional"}
                        </p>
                      </div>
                    </div>

                    {/* Actions Right */}
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <button
                        onClick={() => handleReview("rejected", req._id)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/5 bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/10 transition-all uppercase text-xs font-bold tracking-widest"
                      >
                        <FaTimes className="text-sm" />
                        <span>Dismiss</span>
                      </button>
                      <button
                        onClick={() => handleReview("accepted", req._id)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:bg-cyan-400 hover:scale-[1.02] transition-all active:scale-95 uppercase text-xs font-bold tracking-widest"
                      >
                        <FaCheck className="text-sm" />
                        <span>Establish</span>
                      </button>
                    </div>
                  </div>
                ),
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Requests;
