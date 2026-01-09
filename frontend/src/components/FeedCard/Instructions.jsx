import {
  FaTimes,
  FaHeart,
  FaArrowUp,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

const Instruction = () => {
  return (
    <div
      data-testid="instructions"
      className="w-full flex flex-wrap gap-16 justify-center mb-3 hidden sm:flex"
    >
      <div className="flex items-center space-x-1 text-gray-300">
        <FaArrowLeft className="text-lg" />
        <span>NOPE</span>
      </div>

      <div className="flex items-center space-x-1 text-gray-300">
        <FaArrowRight className="text-lg" />
        <span>LIKE</span>
      </div>

      <div className="flex items-center space-x-1 text-gray-300">
        <FaArrowUp className="text-lg" />
        <span>SUPERLIKE</span>
      </div>
    </div>
  );
};

export default Instruction;
