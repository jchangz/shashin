import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <header>
    <nav>
      <ul style={{ listStyleType: "none" }}>
        <li style={{ display: "inline", marginRight: 10 }}>
          <Link to="/">Japan</Link>
        </li>
        <li style={{ display: "inline", marginRight: 10 }}>
          <Link to="/Latest">Latest</Link>
        </li>
        <li style={{ display: "inline" }}>
          <Link to="/Studio">Studio</Link>
        </li>
      </ul>
    </nav>
  </header>
);
