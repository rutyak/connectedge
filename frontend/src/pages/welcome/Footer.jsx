import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";

function Footer() {
  return (
    <footer
      className="
        relative w-full
      "
    >
      {/* Top accent line */}
      <div className="max-w-7xl mx-auto py-10 sm:py-16 md:py-24 px-6 flex flex-col items-center">
        {/* Social Icons */}
        <div className="flex gap-6 mb-12">
          {[FaFacebook, FaSquareXTwitter, AiFillInstagram, IoLogoYoutube].map(
            (Icon, i) => (
              <a
                key={i}
                href="#"
                className="
                  p-3 rounded-full
                  border border-white/20
                  bg-white/10
                  hover:bg-cyan-400/20
                  hover:scale-110
                  hover:shadow-[0_0_25px_rgba(56,189,248,0.45)]
                  transition-all duration-300
                "
              >
                <Icon className="text-xl text-slate-300 hover:text-white transition" />
              </a>
            )
          )}
        </div>

        {/* Main Links */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8 sm:mb-10 text-sm">
          {[
            "Home",
            "About",
            "Support",
            "Contact Us",
            "Privacy Policy",
            "Terms of Service",
          ].map((item, i) => (
            <a
              key={i}
              href="#"
              className="text-slate-300 hover:text-white transition"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Policies */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8 sm:mb-12 text-sm">
          {["Subscription Terms", "Refund Policy", "Cancellation Policy"].map(
            (item, i) => (
              <a
                key={i}
                href="#"
                className="text-slate-400 hover:text-white transition"
              >
                {item}
              </a>
            )
          )}
        </div>

        {/* Divider */}
        <div className="w-full max-w-3xl h-px bg-white/20 mb-12" />

        {/* Razorpay */}
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-slate-300 text-sm">
            Secure payments powered by{" "}
            <span className="text-cyan-400 font-medium">Razorpay</span>
          </p>
          <img
            src="https://razorpay.com/assets/razorpay-logo.svg"
            alt="Razorpay"
            className="h-6 mx-auto mt-3 opacity-95"
          />
        </div>

        {/* Copyright */}
        <div className="text-center text-sm">
          <p className="text-slate-400">
            © {new Date().getFullYear()} ConnectEdge. All rights reserved.
          </p>
          <p className="text-slate-400 mt-2">
            Designed with ❤️ by{" "}
            <span className="text-cyan-400 font-medium">Rutik Khandekar</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
