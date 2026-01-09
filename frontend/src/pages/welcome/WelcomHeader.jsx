import { Link, NavLink } from "react-router-dom";
import Login from "../auth/Auth";
import connectEdgeIcon from "../../assets/icons/connectEdgeIcon.svg";

function WelcomHeader({ isScrollingUp }) {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div
        data-testid="header"
        className={`transition-all duration-500 ease-out ${
          isScrollingUp
            ? "bg-white/10 backdrop-blur-xl shadow-lg border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div
          className={`max-w-[1500px] mx-auto px-5 md:px-7 lg:px-16 flex items-center justify-between
          transition-all duration-500 ${
            isScrollingUp ? "h-14 md:h-16" : "h-16 md:h-20"
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center group select-none">
            <img
              src={connectEdgeIcon}
              alt="ConnectEdge Logo"
              loading="lazy"
              className="h-9 w-9 md:h-11 md:w-11
              transition-transform duration-300
              group-hover:rotate-6 group-hover:scale-105"
            />
            <span
              className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight
              bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400
              text-transparent bg-clip-text"
            >
              ConnectEdge
            </span>
          </Link>

          {/* Navigation + CTA */}
          <div className="flex items-center gap-6 lg:gap-10">
            <nav className="hidden md:flex items-center gap-8 lg:gap-12">
              {["Services", "Contact Us"].map((item) => (
                <NavLink
                  key={item}
                  to="/"
                  className={({ isActive }) =>
                    `relative font-medium text-base lg:text-lg transition-colors duration-200
                    ${
                      isActive
                        ? "text-blue-400"
                        : "text-gray-300 hover:text-blue-400"
                    }
                    after:absolute after:left-0 after:-bottom-1 after:h-[2px]
                    after:bg-blue-500 after:transition-all after:duration-300
                    after:w-${isActive ? "full" : "0"} hover:after:w-full`
                  }
                >
                  {item}
                </NavLink>
              ))}
            </nav>

            {/* Login CTA */}
            <div className="relative group">
              <Login />
              <div
                className="absolute inset-0 -z-10 rounded-xl
                bg-gradient-to-r from-blue-600 to-cyan-500
                blur-lg opacity-40 group-hover:opacity-60 transition-opacity"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default WelcomHeader;
