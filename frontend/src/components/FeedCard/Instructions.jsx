import { FaArrowUp, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Instruction = () => {
  const instructions = [
    {
      label: "NOPE",
      icon: <FaArrowLeft />,
      color: "hover:text-rose-500",
      glow: "group-hover:shadow-rose-500/20",
    },
    {
      label: "LIKE",
      icon: <FaArrowRight />,
      color: "hover:text-emerald-400",
      glow: "group-hover:shadow-emerald-500/20",
    },
    {
      label: "SUPERLIKE",
      icon: <FaArrowUp />,
      color: "hover:text-cyan-400",
      glow: "group-hover:shadow-cyan-500/20",
    },
  ];

  return (
    <div
      data-testid="instructions"
      className="flex w-full flex-wrap gap-5 lg:gap-16 justify-center items-center py-1"
    >
      {instructions.map((item, index) => (
        <div
          key={index}
          className="group flex items-center sm:space-x-3 cursor-default transition-all duration-300"
        >
          <div
            className={`flex items-center justify-center w-10 h-10 text-gray-400 text-sm transition-all duration-300 group-hover:scale-110 group-hover:border-white/20 ${item.color} ${item.glow} shadow-lg backdrop-blur-sm`}
          >
            {item.icon}
          </div>

          <div className="flex flex-col">
            <span
              className={`text-[12px] font-black uppercase tracking-[0.2em] text-gray-500 group-hover:text-gray-400 transition-colors`}
            >
              {item.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Instruction;
