import { useState } from "react";
import Input from "./Input"; // Adjust path as needed

function SkillTags({ tags, setTags }) {
  const [input, setInput] = useState("");

  function handleKeyDown(e) {
    if ((e.key === "Enter" || e.key === ",") && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        setTags([...tags, input.trim()]);
      }
      setInput("");
    }
  }

  function removeTag(index) {
    setTags(tags?.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col gap-2 mt-4">
      <div className="relative group">
        <Input
          label="Skills"
          placeholder={tags.length === 0 ? "Add skill (Press Enter or comma)" : ""}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className={""} 
        />
        
        <div className="flex flex-wrap gap-2 mt-3">
          {tags?.map((tag, index) => (
            <div
              key={index}
              className="flex items-center bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-3 py-1 rounded-lg animate-in fade-in zoom-in duration-200"
            >
              <span className="text-xs font-bold uppercase tracking-wider">
                #{tag}
              </span>
              <button
                type="button"
                className="ml-2 text-xs font-black text-cyan-400/50 hover:text-red-400 transition-colors"
                onClick={() => removeTag(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkillTags;