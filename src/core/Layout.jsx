import React from "react";
import PropType from "prop-types";
import Menu from "./Menu";

import "../styles.css";

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}) => {
  return (
    <div>
      <Menu />
      <div className="jumbotron">
        <h2>{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
  );
};

Layout.propTypes = {
  title: PropType.string.isRequired,
  description: PropType.string.isRequired,
  className: PropType.string,
};

export default Layout;
