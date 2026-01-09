import { Mail, Lock } from "lucide-react";
import Input from "../../components/ui/Input";

const loginFields = [
  { 
    type: "email", 
    name: "email", 
    placeholder: "Email address", 
    icon: <Mail className="w-5 h-5" /> 
  },
  { 
    type: "password", 
    name: "password", 
    placeholder: "Password", 
    icon: <Lock className="w-5 h-5" /> 
  },
];

const Login = ({ setAuthView, setError, handleChanges }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-4">
        {loginFields.map((item) => (
          <Input
            key={item.name}
            type={item.type}
            name={item.name}
            placeholder={item.placeholder}
            handleChanges={handleChanges}
            icon={item.icon}
          />
        ))}
      </div>

      <div className="flex items-center justify-between px-1">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input 
            type="checkbox" 
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
          />
          <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
            Remember me
          </span>
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