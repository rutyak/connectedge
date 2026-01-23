import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaEdit, FaCamera } from "react-icons/fa";
import { FiSave, FiX, FiUser, FiBriefcase, FiHash } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import { addUser } from "../../utils/userSlice";
import SkillTags from "./SkillTags";
import ChangePassword from "./ChangePassword";
import FeedCards from "../../components/FeedCard/FeedCards";

const base_url = import.meta.env.VITE_APP_BACKEND_URL;

const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [profileImageFile, setProfileImageFile] = useState();
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [tags, setTags] = useState(user.skills?.length ? user?.skills : []);

  const { firstname, lastname, age, gender, job, imageurl, skills } = user;

  const [formData, setFormData] = useState({
    firstname,
    lastname,
    age,
    gender,
    job,
    imageurl,
    skills,
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setProfileImageFile(file);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfileEdit = async () => {
    setIsLoading(true);
    try {
      let imageRes = null;
      if (profileImageFile) {
        const imageFormData = new FormData();
        imageFormData.append("profileImage", profileImageFile);
        imageRes = await axios.post(`${base_url}/upload/image`, imageFormData, {
          withCredentials: true,
        });
      }

      const res = await axios.patch(
        `${base_url}/profile/edit`,
        {
          ...formData,
          imageurl: imageRes?.data?.imageurl || formData.imageurl,
          skills: tags,
        },
        { withCredentials: true },
      );

      if (res.status === 200) {
        toast.success(res?.data?.message || "Profile Updated Successfully");
        dispatch(addUser(res?.data?.user));
        setIsEditing(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-4 sm:py-6 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-10 items-start">
        <div className="w-full xl:w-[60%] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl relative overflow-hidden group transition-all duration-300">
          <div className="absolute -top-12 -left-12 md:-top-24 md:-left-24 w-32 h-32 md:w-48 md:h-48 bg-blue-500/10 blur-[60px] md:blur-[100px] rounded-full group-hover:bg-blue-500/20 transition-all" />

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-10 relative z-10">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Profile Settings
              </h2>
              <p className="text-slate-400 text-[10px] md:text-xs uppercase tracking-widest mt-1">
                Identity & Professional Bio
              </p>
            </div>

            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600/20 border border-blue-500/30 text-blue-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 text-sm md:text-base"
              >
                <FaEdit /> Edit Profile
              </button>
            ) : (
              <div className="flex w-full sm:w-auto gap-3">
                <button
                  onClick={handleProfileEdit}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 md:px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all text-sm md:text-base"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Saving...
                    </div>
                  ) : (
                    <>
                      <FiSave /> Save
                    </>
                  )}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 md:px-5 py-2.5 bg-white/5 border border-white/10 text-slate-300 rounded-xl hover:bg-white/10 transition-all text-sm md:text-base"
                >
                  <FiX /> Cancel
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center mb-8 md:mb-10">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <img
                src={imagePreview || user?.imageurl}
                alt="Profile"
                className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-[#020617] ring-2 ring-white/10"
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 md:bottom-1 md:right-1 cursor-pointer p-2 md:p-3 bg-cyan-500 text-white rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all border-4 border-[#020617]">
                  <FaCamera size={14} className="md:w-[18px] md:h-[18px]" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
            {[
              { id: "firstname", label: "First Name", icon: <FiUser /> },
              { id: "lastname", label: "Last Name", icon: <FiUser /> },
              { id: "age", label: "Age", type: "number" },
              { id: "gender", label: "Gender" },
              {
                id: "job",
                label: "Professional Title",
                icon: <FiBriefcase />,
                full: true,
              },
            ].map((field) => (
              <div key={field.id} className={field.full ? "md:col-span-2" : ""}>
                <label className="block text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 ml-1">
                  {field.label}
                </label>
                <div className="relative">
                  {isEditing ? (
                    <input
                      type={field.type || "text"}
                      name={field.id}
                      value={formData[field.id]}
                      onChange={handleChange}
                      placeholder={`Enter ${field.label.toLowerCase()}...`}
                      className="w-full bg-white/5 border border-white/10 p-3 md:p-3.5 rounded-xl md:rounded-2xl text-white text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all placeholder:text-slate-600"
                    />
                  ) : (
                    <div className="w-full bg-white/5 border border-transparent p-3 md:p-3.5 rounded-xl md:rounded-2xl text-slate-200 text-sm md:text-base font-medium truncate">
                      {user[field.id] || "Not specified"}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Skills Section */}
          <div className="mb-8 p-4 md:p-6 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl">
            <div className="flex items-center gap-2 mb-4 text-cyan-400">
              <FiHash />
              <h3 className="text-xs md:text-sm font-bold uppercase tracking-widest">
                Core Skillset
              </h3>
            </div>
            {isEditing ? (
              <SkillTags tags={tags} setTags={setTags} />
            ) : (
              <div className="flex flex-wrap gap-2">
                {user?.skills?.length > 0 ? (
                  user.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] md:text-xs font-bold rounded-lg"
                    >
                      #{skill}
                    </span>
                  ))
                ) : (
                  <p className="text-slate-500 text-xs md:text-sm italic">
                    No skills listed yet.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Password Security */}
          {!isEditing && (
            <div className="border-t border-white/5 pt-6">
              <ChangePassword
                showPasswordFields={showPasswordFields}
                setShowPasswordFields={setShowPasswordFields}
              />
            </div>
          )}
        </div>
        <div className="w-full xl:w-[40%] sticky top-6">
          <div className="flex flex-col items-center">
            <div className="mb-6 text-center">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Live Network Card
              </h2>
              <p className="text-slate-500 text-xs uppercase tracking-[0.3em] mt-1">
                Real-time Visibility
              </p>
            </div>

            <div className="h-[400px] sm:h-[480px] w-[96%] sm:w-[360px] relative rounded-[2rem] shadow-inner">
              <FeedCards
                profile={{
                  firstname: formData?.firstname,
                  lastname: formData?.lastname,
                  age: formData?.age,
                  job: formData?.job || "Job title not set",
                  distance: 0,
                  imageurl: imagePreview || formData?.imageurl,
                }}
                showActions={true}
                showLabels={true}
                isPreview={true}
              />
            </div>

            <p className="mt-8 text-slate-500 text-[10px] text-center max-w-xs leading-relaxed uppercase tracking-widest opacity-60">
              This is how your profile appears to other professionals on the
              ConnectEdge network.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
