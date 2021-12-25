import React from "react";
import PropType from "prop-types";

import { API } from "../config";

const ShowImage = ({ item, url }) => (
  <div className="product-img">
    <img
      src={`${API}/${url}/photo/${item._id}`}
      alt={item.name}
      className="mb-3"
      style={{ maxHeight: "100%", maxWidth: "100%" }}
    />
  </div>
);

ShowImage.propTypes = {
  item: PropType.object.isRequired,
  url: PropType.string.isRequired,
};

export default ShowImage;
