import React from "react";

const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  className = "",
  containerClass = "",
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-2 ${containerClass}`}>
      {label && (
        <label
          className="block text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-white/5 border ${
          error ? "border-red-500" : "border-white/10"
        } p-3.5 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all placeholder:text-gray-500 ${className}`}
        {...props}
      />
      {error && <span className="text-red-500 text-xs ml-1 mt-1">{error}</span>}
    </div>
  );
};

export default Input;
