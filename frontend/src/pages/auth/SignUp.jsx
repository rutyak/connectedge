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
      {/* First & Last Name Grid */}
      <div className="grid grid-cols-2 gap-4">
        {signupFields.slice(0, 2).map((item) => (
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

      {/* Email & Password Full Width */}
      <div className="space-y-4">
        {signupFields.slice(2).map((item) => (
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
    </div>
  );
};

export default SignUp;