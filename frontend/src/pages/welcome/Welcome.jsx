import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/ConnectEdge_bg.jpg";
import Reviews from "./Reviews";
import Footer from "./Footer";
import WelcomHeader from "./WelcomHeader";
import Herosection from "./Herosection";
import Auth from "../auth/Auth";

function Welcome() {
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const userData = useSelector((state) => state.user);

  const [loginToggle, setLoginToggle] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (userData !== null) {
      navigate("/dashboard");
    }
  }, []);

  const backgroundStyles = {
    backgroundImage: `url(${bgImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    width: "100%",
  };

  return (
    <div
      data-testid="welcome-container"
      className="relative "
      style={backgroundStyles}
    >
      <div className="absolute inset-0 bg-gradient-to-b p-0 from-black/80 via-black/40 to-black/90 z-0" />
      <WelcomHeader
        isScrollingUp={isScrollingUp}
        setIsScrollingUp={setIsScrollingUp}
        setLoginToggle={setLoginToggle}
      />

      <Herosection
        isScrollingUp={isScrollingUp}
        setIsScrollingUp={setIsScrollingUp}
      />

      <Reviews />

      <div
        className="min-h-[65vh] md:h-auto backdrop-blur-md
        text-slate-300"
      >
        <Footer />
      </div>

      <Auth loginToggle={loginToggle} setLoginToggle={setLoginToggle} />
    </div>
  );
}

export default Welcome;
