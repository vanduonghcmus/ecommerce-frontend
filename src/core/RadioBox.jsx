import React, { useState, Fragment } from "react";
import PropType from "prop-types";

const RadioBox = ({ prices, handleFilter }) => {
  const [value, setValue] = useState(0);

  const handleChange = (e) => {
    handleFilter(e.target.value);
  };

  return prices.map((p, i) => {
    return (
      <div key={i}>
        <input
          id={`price-${i}`}
          onChange={handleChange}
          type="radio"
          className="mr-2 ml-4"
          value={`${p._id}`}
          name="price"
        />
        <label
          htmlFor={`price-${i}`}
          className="form-check-label"
          style={{ cursor: "pointer" }}
        >
          {p.name}
        </label>
      </div>
    );
  });
};

RadioBox.propTypes = {
  prices: PropType.array.isRequired,
  handleFilter: PropType.func.isRequired,
};

export default RadioBox;
