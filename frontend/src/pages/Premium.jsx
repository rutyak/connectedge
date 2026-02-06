import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import {
  FiCheck,
  FiZap,
  FiAward,
  FiHexagon,
  FiShield,
  FiStar,
} from "react-icons/fi";

const base_url = import.meta.env.VITE_APP_BACKEND_URL;

const plans = [
  {
    title: "Basic",
    price: "99",
    features: ["See who liked you", "Unlimited swipes", "Basic profile boosts"],
    bg: "from-slate-800 to-slate-900",
    border: "border-slate-700",
    icon: <FiZap className="text-blue-400" />,
    button: "bg-slate-700 hover:bg-slate-600",
  },
  {
    title: "Gold",
    price: "299",
    features: [
      "All Basic features",
      "Message anyone",
      "2x profile boosts",
      "Priority support",
    ],
    bg: "from-amber-500/10 to-yellow-600/20",
    border: "border-yellow-500/50",
    icon: <FiAward className="text-yellow-500" />,
    highlight: true,
    button:
      "bg-gradient-to-r from-yellow-500 to-amber-600 hover:shadow-yellow-500/20",
  },
  {
    title: "Platinum",
    price: "599",
    features: [
      "All Gold features",
      "Unlimited boosts",
      "Exclusive badge",
      "Early access to new features",
    ],
    bg: "from-purple-900/40 to-indigo-900/40",
    border: "border-purple-500/50",
    icon: <FiHexagon className="text-purple-400" />,
    button:
      "bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-purple-500/20",
  },
];

const Premium = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  async function verifyPremiumUser() {
    try {
      const res = await axios.get(`${base_url}/premium/verification`, {
        withCredentials: true,
      });
      dispatch(addUser(res.data?.user));
    } catch (error) {
      console.error("Error verifying premium:", error);
    }
  }

  async function handleSubscribeClick(type) {
    try {
      let plan = type?.toLowerCase();
      const res = await axios.post(
        `${base_url}/order/create`,
        { membershipType: plan },
        { withCredentials: true },
      );

      const { keyId, amount, currency, orderId, notes } = res.data.payment;

      const options = {
        key: keyId,
        amount,
        currency,
        name: "ConnectEdge",
        description: "Connect to other developers",
        order_id: orderId,
        prefill: {
          name: notes.firstname + " " + notes.lastname,
          email: notes.email,
        },
        theme: { color: "#7C3AED" },
        handler: verifyPremiumUser,
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
    }
  }

  if (user.isPremium) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
        <div className="relative group w-full max-w-2xl">
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-600 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

          <div className="relative bg-slate-950/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 sm:p-16 md:p-20 text-center shadow-2xl">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-600/10 rounded-full blur-[80px] animate-pulse" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-orange-600/10 rounded-full blur-[80px] animate-pulse delay-700" />

            <div className="relative z-10">
              <div className="relative inline-flex mb-8">
                <div className="absolute inset-0 bg-yellow-400 blur-xl opacity-30 animate-ping" />
                <div className="relative inline-flex items-center justify-center w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-br from-yellow-300 via-amber-500 to-orange-600 rounded-3xl shadow-2xl shadow-amber-500/40 transform rotate-3 hover:rotate-6 transition-transform duration-300">
                  <FiStar className="text-white text-4xl sm:text-6xl drop-shadow-lg" />
                </div>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-tight">
                Welcome, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500 drop-shadow-sm">
                  Elite Member
                </span>
              </h1>

              <p className="text-slate-400 text-lg sm:text-xl md:text-2xl mb-12 max-w-sm mx-auto leading-relaxed font-medium">
                Your premium status is{" "}
                <span className="text-emerald-400 font-bold">Active</span>.
                Unlock the full potential of ConnectEdge today.
              </p>

              <Link
                to="/dashboard"
                className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-slate-950 transition-all duration-300 bg-white rounded-2xl hover:bg-amber-400 hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:shadow-amber-500/30 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2 text-lg">
                  Enter Dashboard{" "}
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <div className="mt-12 flex justify-center items-center gap-2 opacity-40">
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-slate-500" />
                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-500">
                  Verified Premium Account
                </span>
                <div className="h-px w-8 bg-gradient-to-l from-transparent to-slate-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-slate-200 selection:bg-purple-500/30">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-9 py-10 lg:py-12 xl:py-16">
        <div className="text-center mb-12 sm:mb-14 md:mb-16 lg:mb-20 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 sm:w-40 sm:h-40 bg-purple-600/30 blur-[80px] sm:blur-[100px] -z-10" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black text-white mb-4 sm:mb-6 tracking-tighter">
            Level Up Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
              Network.
            </span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed font-medium px-2">
            Join the inner circle of top developers. Choose a plan that fuels
            your career growth and meaningful connections.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 items-stretch md:items-end">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`group relative rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-8 transition-all duration-500 border ${plan.border} bg-gradient-to-b ${plan.bg} flex flex-col ${
                plan.highlight
                  ? "xl:scale-110 z-20 shadow-2xl shadow-yellow-500/10 lg:order-none"
                  : "hover:border-white/20"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-[10px] sm:text-xs font-black uppercase tracking-widest px-4 sm:px-6 py-1.5 sm:py-2 rounded-full shadow-lg whitespace-nowrap">
                  Most Popular
                </div>
              )}

              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="p-2.5 sm:p-3 bg-white/5 rounded-xl sm:rounded-2xl text-xl sm:text-2xl">
                  {plan.icon}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {plan.title}
                </h2>
              </div>

              <div className="flex items-baseline gap-1 mb-6 sm:mb-8">
                <span className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
                  ₹{plan.price}
                </span>
                <span className="text-slate-500 text-sm sm:text-base font-medium">
                  /month
                </span>
              </div>

              <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 flex-grow">
                {plan.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 text-slate-300"
                  >
                    <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-500/10 flex items-center justify-center mt-0.5">
                      <FiCheck className="text-emerald-500 text-[10px] sm:text-xs" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium leading-tight">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleSubscribeClick(plan.title)}
                className={`w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl text-white font-bold text-sm sm:text-base transition-all duration-300 transform group-hover:scale-[1.02] active:scale-95 shadow-lg ${plan.button}`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center gap-6 sm:gap-10">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all px-4">
            <div className="flex items-center gap-2 font-bold text-sm sm:text-base md:text-xl">
              <FiShield /> Secure Payments
            </div>
            <div className="flex items-center gap-2 font-bold text-sm sm:text-base md:text-xl">
              <FiZap /> Instant Access
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10 text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold text-slate-600 px-4 text-center">
            <Link to="/" className="hover:text-purple-400 transition-colors">
              Terms
            </Link>
            <Link to="/" className="hover:text-purple-400 transition-colors">
              Refunds
            </Link>
            <Link to="/" className="hover:text-purple-400 transition-colors">
              Cancellation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
