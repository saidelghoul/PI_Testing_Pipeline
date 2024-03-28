import { useState } from "react";
import PropTypes from "prop-types";

export const TagField = ({ tags, addTag, removeTag, maxTags }) => {
  // track the use input

  const [userInput, setUserInput] = useState(" ");

  // Handle input onChange

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  // handle Enter key press

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission or new line creation

      if (
        userInput.trim() !== "" &&
        userInput.length <= 12 &&
        tags.length < maxTags
      ) {
        addTag(userInput);
        setUserInput(""); // Clear the input after adding a tag
      }
    }
  };

  return (
    <div className=" d-flex flex-row w-100 ">
      <input
        name="keyword_tags"
        type="text"
        placeholder={
          tags.length < maxTags
            ? "Add a tag"
            : `You can only enter max. of ${maxTags} tags`
        }
        className=" w-100 border-2 rounded-2 p-3 "
        onKeyDown={handleKeyPress}
        onChange={handleInputChange}
        value={userInput}
        disabled={tags.length === maxTags}
      />

      {/* ===== Render the tags here ===== */}

      <div className=" d-flex flex-row flex-wrap gap-3 mt-4">
        {tags.map((tag, index) => (
          <span
            key={`${index}-${tag}`}
            className=" d-flex d-inline-flex align-items-start justify-content-start px-3 py-2 rounded rounded-2 text-sm-center shadow-sm font-monospace mr-2"
          >
            {tag}
            <button
              className="ml-2 text-bg-light "
              onClick={() => removeTag(tag)}
              title={`Remove ${tag}`}
            >
              &times;
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

TagField.propTypes = {
  tags: PropTypes.array,
  addTag: PropTypes.func,
  removeTag: PropTypes.func,
  maxTags: PropTypes.number,
};
