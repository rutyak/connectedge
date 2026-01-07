import { Mail, Lock, ArrowRight } from "lucide-react";
import Input from "../../components/ui/Input";

const loginFields = [
  { 
    type: "email", 
    name: "email", 
    placeholder: "Email address", 
    icon: <Mail className="w-5 h-5 text-gray-400" /> 
  },
  { 
    type: "password", 
    name: "password", 
    placeholder: "Password", 
    icon: <Lock className="w-5 h-5 text-gray-400" /> 
  },
];

const Login = ({ setAuthView, setError, handleChanges }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-4">
        {loginFields.map((item) => (
          <div key={item.name} className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-blue-500">
              {item.icon}
            </div>
            <Input
              type={item.type}
              name={item.name}
              placeholder={item.placeholder}
              handleChanges={handleChanges}
              className="
                w-full pl-12 pr-4 py-3.5
                bg-gray-50 border border-gray-200 rounded-2xl
                text-gray-900 text-sm
                placeholder:text-gray-400
                transition-all duration-300
                hover:bg-white hover:border-blue-200
                focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500
                outline-none
              "
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between px-1">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Remember me</span>
        </label>
        
        <button
          type="button"
          onClick={() => {
            setAuthView("forgotPassword");
            setError("");
          }}
          className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          Forgot password?
        </button>
      </div>
    </div>
  );
};

export default Login;