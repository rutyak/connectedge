function Card({ name, position, rating, text }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="relative h-[240px] sm:h-[280px] p-5 sm:p-6 rounded-b-2xl rounded-t-md bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl bg-gradient-to-r from-indigo-500 to-[#00caf6]" />

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-[#00caf6] text-white flex items-center justify-center font-bold text-lg shadow">
          {initials}
        </div>

        <div>
          <h1 className="text-sm md:text-base font-semibold text-gray-800">
            {name}
          </h1>
          <p className="text-xs text-gray-500">{position}</p>
        </div>
      </div>

      <hr className="my-4 border-gray-200" />

      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-5">
        “{text}”
      </p>

      <div className="absolute bottom-4 left-5 right-5 flex justify-between items-center mt-4">
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 transition-transform duration-200 ${
                i < rating ? "text-yellow-400 scale-110" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l2.9 6.9L22 10l-5 4.9L18.2 22 12 18.4 5.8 22 7 14.9 2 10l7.1-1.1L12 2z" />
            </svg>
          ))}
        </div>

        <span className="text-xs font-medium text-gray-500">
          {rating}.0 / 5
        </span>
      </div>
    </div>
  );
}

export default Card;
