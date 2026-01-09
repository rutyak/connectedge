const Input = ({ type, name, placeholder, className, handleChanges, icon, ...props }) => {
  return (
    <div className="relative group">
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-blue-500 text-gray-400">
          {icon}
        </div>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChanges}
        required
        className={`
          w-full pr-4 py-3.5
          bg-gray-50 border border-gray-200 rounded-2xl
          text-gray-900 text-sm
          placeholder:text-gray-400
          transition-all duration-300
          hover:bg-white hover:border-blue-200
          focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500
          outline-none
          ${icon ? "pl-12" : "pl-4"}
          ${className}
        `}
        {...props}
      />
    </div>
  );
};

export default Input;