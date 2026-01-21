import { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import Instruction from "./Instructions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { addFeeds, removeFeeds } from "../../utils/feedSlice";
import connectEdgeInnerIcon from "../../assets/icons/connectEdgeIconInner.svg";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../../utils/userSlice";
import Card from "./Card";

const base_url = import.meta.env.VITE_APP_BACKEND_URL;

function FeedCards({ profile, showLabels = true, isPreview = false }) {
  const navigate = useNavigate();
  const feeds = useSelector((state) => state?.feeds);
  const [people, setPeople] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!profile) getFeedData();
  }, []);

  // all feeds
  useEffect(() => {
    if (!profile && Array.isArray(feeds)) setPeople(feeds);
  }, [feeds]);

  //single profile
  useEffect(() => {
    if (profile) setPeople([profile]);
  }, [profile]);

  async function getFeedData() {
    try {
      const res = await axios.get(`${base_url}/feeds`, {
        withCredentials: true,
      });
      setPeople(res.data?.feeds);
      dispatch(addFeeds(res.data?.feeds));
    } catch (error) {
      const msg = error.response?.data?.message;
      if (msg === "jwt expired" || msg === "Please login") {
        if (!toast.isActive("authExpiredToast")) {
          toast.error("Please log in again", { toastId: "authExpiredToast" });
        }
        dispatch(removeUser());
        navigate("/");
      } else {
        console.error(error);
      }
    }
  }

  // Handle swipe actions
  async function handleCardLeft(dir, id) {
    try {
      let endpoint = "";
      if (dir === "right")
        endpoint = `${base_url}/request/send/interested/${id}`;
      else if (dir === "left")
        endpoint = `${base_url}/request/send/ignored/${id}`;
      else if (dir === "up")
        endpoint = `${base_url}/request/send/superinterested/${id}`;

      const res = await axios.post(endpoint, {}, { withCredentials: true });
      toast.success(res.data?.message || "Request sent successfully");

      dispatch(removeFeeds(id));
      if (!isPreview) setPeople((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error(error);
      if (!toast.isActive("requestErrorToast")) {
        toast.error("Something went wrong", { toastId: "requestErrorToast" });
      }
    }
  }

  return (
    <div
      data-testid="feedcard"
      className="h-full w-full flex flex-col items-center justify-between"
    >
      {/* Tinder Cards */}
      <div className="w-full h-full flex flex-col items-center">
        <div className="hidden sm:block">
          {showLabels && !isPreview && (
            <img
              src={connectEdgeInnerIcon}
              alt="connectEdgeIcon"
              className="h-8 w-8 text-gray-300 my-5 lg:my-7"
            />
          )}
        </div>

        <div className="relative w-[96%] sm:w-[340px] lg:w-[360px] h-full sm:h-[460px] lg:h-[480px] flex justify-center">
          {people?.map((person) =>
            isPreview ? (
              <div key={person?._id} className="absolute w-full h-full">
                <Card person={person} />
              </div>
            ) : (
              <TinderCard
                key={person?._id}
                preventSwipe={["down"]}
                onSwipe={(dir) => handleCardLeft(dir, person?._id)}
                swipeRequirementType="position"
                className="absolute w-full h-full"
              >
                <Card person={person} />
              </TinderCard>
            ),
          )}
        </div>
      </div>

      {/* Instructions */}
      {!isPreview && showLabels && <Instruction />}
    </div>
  );
}

export default FeedCards;
