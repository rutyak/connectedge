import { Mail } from "lucide-react";
import Input from "../../components/ui/Input";

const ForgotPassword = ({ handleChanges }) => {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Input
        type="email"
        name="email"
        placeholder="Enter your email"
        handleChanges={handleChanges}
        icon={<Mail size={20} />}
      />
    </div>
  );
};

export default ForgotPassword;