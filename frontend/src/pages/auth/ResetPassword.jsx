import { Lock } from "lucide-react";
import Input from "../../components/ui/Input";

const passwordFields = [
  { 
    type: "password", 
    name: "password", 
    placeholder: "New Password", 
    icon: <Lock className="w-5 h-5" /> 
  },
  {
    type: "password",
    name: "confirmPassword",
    placeholder: "Confirm Password",
    icon: <Lock className="w-5 h-5" />,
  },
];

const ResetPassword = ({ handleChanges }) => {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {passwordFields.map((item, index) => (
        <Input
          key={item.name + index}
          type={item.type}
          name={item.name}
          placeholder={item.placeholder}
          handleChanges={handleChanges}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export default ResetPassword;