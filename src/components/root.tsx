import React, { FC, createContext, useState, useEffect, useRef } from "react";
import * as cursorEffects from "cursor-effects";

export const AnimationContext = createContext(true);

const Root: FC<{ path: string }> = ({ children, path }) => {
  const [originalPath, setPath] = useState(path);
  const [rendered, setRendered] = useState(false);
  const isCursorInitialized = useRef(false);

  useEffect(() => {
    if (originalPath !== path) {
      setRendered(true);
    }
  });

  useEffect(() => {
    if (isCursorInitialized.current) return;
    isCursorInitialized.current = true;
    cursorEffects.bubbleCursor();
  }, []);

  return (
    <AnimationContext.Provider
      value={!rendered && originalPath === path ? true : false}
    >
      {children}
    </AnimationContext.Provider>
  );
};

export default Root;
