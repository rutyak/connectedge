import { KeyRound } from "lucide-react";
import Input from "../../components/ui/Input";

const VerifyOtp = ({ handleChanges }) => {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Input
        type="text"
        name="otp"
        placeholder="Enter 6-digit OTP"
        handleChanges={handleChanges}
        maxLength={6}
        icon={<KeyRound className="w-5 h-5" />}
        className="tracking-[0.5em] font-medium placeholder:tracking-normal"
      />
    </div>
  );
};

export default VerifyOtp;