import React, { FC, createContext, useState, useEffect, useRef } from "react";

import { getCookies, SERVER_URL } from "../utils";

export const AnimationContext = createContext(true);
export const ContactAnimationContext = createContext(true);
export const ContactSubmitAnimationContext = createContext(true);
export const VisitsContext = createContext();

const Root: FC<{ path: string }> = ({ children, path }) => {
  const [originalPath, setPath] = useState(path);
  const [rendered, setRendered] = useState(false);
  const contactAnimationState = useState(false);
  const contactSubmitAnimationState = useState(false);
  const [visits, setVisits] = useState();
  const landingRef = useRef(true);

  useEffect(() => {
    if (originalPath !== path) {
      setRendered(true);
    }
  }, [originalPath, path]);

  useEffect(() => {
    const cookies = getCookies();
    if (cookies.trackvisits === "no") return;
    fetch(`${SERVER_URL}/visit`, { 
      method: "POST", 
      body: JSON.stringify({ path, landing: landingRef.current }), 
      headers: {
        "Content-Type": "application/json",
      }, 
    }).catch(() => null);
    if (landingRef.current) {
      landingRef.current = false;
    }
  }, [path]);

  useEffect(() => {
    fetch(`${SERVER_URL}/visit`)
      .then(res => res.json())
      .then(setVisits)
      .catch(() => null);
  }, []);

  return (
    <AnimationContext.Provider
      value={!rendered && originalPath === path ? true : false}
    >
      <ContactAnimationContext.Provider value={contactAnimationState}>
        <ContactSubmitAnimationContext.Provider value={contactSubmitAnimationState}>
          <VisitsContext.Provider value={visits}>
            {children}
          </VisitsContext.Provider>
        </ContactSubmitAnimationContext.Provider>
      </ContactAnimationContext.Provider>
    </AnimationContext.Provider>
  );
};

export default Root;
