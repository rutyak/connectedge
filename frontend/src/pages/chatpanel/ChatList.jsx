import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

function ChatList({ search }) {
  const connections = useSelector((state) => state.connections);
  const navigate = useNavigate();
  const location = useLocation();
  const activeChatId = location.state?.targetUser?.id;

  const listToRender = connections?.filter((person) =>
    person?.firstname?.toLowerCase().includes(search?.toLowerCase()),
  );

  return (
    <div className="flex flex-col h-full lg:bg-[#020617]">
      <div className="px-6 py-4 flex items-center justify-between">
        <span className="text-[12px] font-black text-slate-500 uppercase tracking-[0.2em]">
          Recent Connections
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4"></div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 space-y-1 custom-scrollbar">
        {(window.innerWidth < 1024 ? connections : listToRender)?.map(
          (person) => {
            console.log("person: ", person);

            if(person === null){
              return;
            }
            const isActive = activeChatId === person?._id;
            return (
              <div
                key={person?._id}
                onClick={() =>
                  navigate(
                    window.innerWidth < 1024
                      ? "/chatwindow"
                      : "/dashboard/chatwindow",
                    {
                      state: {
                        targetUser: {
                          id: person._id,
                          firstname: person.firstname,
                          imageurl: person.imageurl,
                        },
                      },
                    },
                  )
                }
                className={`group relative flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600/20 to-cyan-600/5 border border-white/10"
                    : "hover:bg-white/5 border border-transparent"
                }`}
              >
                {/* Active Glow Indicator */}
                {isActive && (
                  <div className="absolute left-0 w-1 h-8 bg-cyan-400 rounded-r-full shadow-[0_0_15px_#22d3ee]"></div>
                )}

                <div className="relative flex-shrink-0">
                  <img
                    src={
                      person?.imageurl ||
                      `https://ui-avatars.com/api/?name=${person?.firstname}&background=0D8ABC&color=fff`
                    }
                    className={`w-12 h-12 rounded-xl object-cover border-2 transition-all ${isActive ? "border-cyan-400" : "border-white/10"}`}
                  />
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-[#020617] rounded-full"></div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <h4
                      className={`text-sm font-bold truncate ${isActive ? "text-white" : "text-slate-200"}`}
                    >
                      {person?.firstname}
                    </h4>
                    <span className="text-[10px] text-slate-500">2m ago</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate group-hover:text-slate-400 transition-colors">
                    Ready to collaborate on the next project? 🚀
                  </p>
                </div>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
}

export default ChatList;
