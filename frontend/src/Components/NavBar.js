import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { NavContext } from "../misc/context";

const NavBar = ({ currentPath }) => {
  const { navLinks } = useContext(NavContext);

  return (
    <div className="nav_container">
      <ul>
        {navLinks.map(
          (item) =>
            !(item.to === currentPath) && (
              <li key={item.to} className="nav_menu_item">
                <Link to={item.to}>{item.text}</Link>
              </li>
            )
        )}
      </ul>
      {/* </div> */}
    </div>
  );
};

export default NavBar;
