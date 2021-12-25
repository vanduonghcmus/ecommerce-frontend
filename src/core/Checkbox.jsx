import React, { useState } from "react";
import PropType from "prop-types";

const Checkbox = ({ categories, handleFilter }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (c) => () => {
    const currentCategoryId = checked.indexOf(c); // return index or -1
    const newCheckedCategory = [...checked];

    /**
     * if currently checked not already in checked array => push
     * else pull/take off
     */
    if (currentCategoryId === -1) {
      newCheckedCategory.push(c);
    } else {
      newCheckedCategory.splice(currentCategoryId, 1);
    }

    setChecked(newCheckedCategory);
    handleFilter(newCheckedCategory);
  };

  return categories.map((c, i) => {
    return (
      <li key={i} className="list-unstyled">
        <input
          id={`category-${i}`}
          onChange={handleToggle(c._id)}
          type="checkbox"
          className="form-check-input"
          value={checked.indexOf(c._id) !== -1}
        />
        <label
          htmlFor={`category-${i}`}
          className="form-check-label"
          style={{ cursor: "pointer" }}
        >
          {c.name}
        </label>
      </li>
    );
  });
};

Checkbox.propTypes = {
  categories: PropType.array.isRequired,
  handleFilter: PropType.func.isRequired,
};

export default Checkbox;
