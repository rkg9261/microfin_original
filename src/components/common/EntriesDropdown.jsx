import React from "react";
import "./EntriesDropdown.css";

const EntriesDropdown = ({
  value = 10,
  onChange,
  options = [10, 25, 50, 100],
}) => {
  return (
    <div className="entries-dropdown">
      <select
        value={value}
        onChange={(e) =>
          onChange(Number(e.target.value))
        }
      >
        {options.map((item) => (
          <option
            key={item}
            value={item}
          >
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EntriesDropdown;