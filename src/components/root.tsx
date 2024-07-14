import React, { FC, createContext, useState, useEffect, useRef } from "react";

export const AnimationContext = createContext(true);
export const ContactAnimationContext = createContext(true);
export const ContactSubmitAnimationContext = createContext(true);

const Root: FC<{ path: string }> = ({ children, path }) => {
  const [originalPath, setPath] = useState(path);
  const [rendered, setRendered] = useState(false);
  const contactAnimationState = useState(false);
  const contactSubmitAnimationState = useState(false);

  useEffect(() => {
    if (originalPath !== path) {
      setRendered(true);
    }
  }, [originalPath, path]);

  return (
    <AnimationContext.Provider
      value={!rendered && originalPath === path ? true : false}
    >
      <ContactAnimationContext.Provider value={contactAnimationState}>
        <ContactSubmitAnimationContext.Provider value={contactSubmitAnimationState}>
          {children}
        </ContactSubmitAnimationContext.Provider>
      </ContactAnimationContext.Provider>
    </AnimationContext.Provider>
  );
};

export default Root;
