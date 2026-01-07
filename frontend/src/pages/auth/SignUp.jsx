import { User, Mail, Lock } from "lucide-react";
import Input from "../../components/ui/Input";

const signupFields = [
  {
    type: "text",
    name: "firstname",
    placeholder: "First name",
    icon: <User className="w-5 h-5" />,
  },
  {
    type: "text",
    name: "lastname",
    placeholder: "Last name",
    icon: <User className="w-5 h-5" />,
  },
  {
    type: "email",
    name: "email",
    placeholder: "Email address",
    icon: <Mail className="w-5 h-5" />,
  },
  {
    type: "password",
    name: "password",
    placeholder: "Create password",
    icon: <Lock className="w-5 h-5" />,
  },
];

const SignUp = ({ handleChanges }) => {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* First & Last Name */}
      <div className="grid grid-cols-2 gap-4">
        {signupFields.slice(0, 2).map((item) => (
          <div key={item.name} className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-500">
              {item.icon}
            </div>

            <Input
              type={item.type}
              name={item.name}
              placeholder={item.placeholder}
              handleChanges={handleChanges}
              className="
                w-full pl-12 pr-4 py-3
                bg-gray-50 border border-gray-200 rounded-2xl
                text-gray-900 text-sm transition-all duration-300
                hover:bg-white hover:border-blue-200
                focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500
                outline-none
              "
            />
          </div>
        ))}
      </div>

      {/* Email & Password */}
      {signupFields.slice(2).map((item) => (
        <div key={item.name} className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-500">
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
              transition-all duration-300
              hover:bg-white hover:border-blue-200
              focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500
              outline-none
            "
          />
        </div>
      ))}
    </div>
  );
};

export default SignUp;
