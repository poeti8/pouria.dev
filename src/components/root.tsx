import React, { FC, createContext, useState, useEffect, useRef } from "react";

export const AnimationContext = createContext(true);

const Root: FC<{ path: string }> = ({ children, path }) => {
  const [originalPath, setPath] = useState(path);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (originalPath !== path) {
      setRendered(true);
    }
  });

  return (
    <AnimationContext.Provider
      value={!rendered && originalPath === path ? true : false}
    >
      {children}
    </AnimationContext.Provider>
  );
};

export default Root;
