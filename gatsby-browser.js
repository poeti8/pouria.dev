// custom typefaces
import "typeface-montserrat";
import "typeface-merriweather";
import "./static/dracula.css";

import React from "react";
import Root from "./src/components/root";

export const wrapPageElement = ({ element, props }) => {
  return <Root {...props}>{element}</Root>;
};
